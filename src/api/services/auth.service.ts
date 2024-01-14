import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AlreadyRegisteredException } from 'src/utils/exceptions/AlreadyRegisteredException';
import { hashString, matchHash } from '../../utils/functionUtils';
import { RegisterDTO } from '../dtos/register.dto';
import { LoginDTO } from '../dtos/login.dto';
import { UserService } from './user.service';
import { TokenPayload } from '../types/TokenPayload.type';
import { TokenResponse } from '../responses/token.response';

@Injectable()
export class AuthService {
  constructor (
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login (login: LoginDTO) {
    const user = await this.userService.get({
      email: login.email,
    });

    if (!user || !await matchHash(login.password, user.passwordHash)) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return this.getToken({
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
    });
  }

  async register (data: RegisterDTO) {
    const user = await this.userService.get({
      email: data.email,
    });
    if (user) {
      throw new AlreadyRegisteredException();
    }

    const { id, username, avatar } = await this.userService.create({
      ...data,
      password: await hashString(data.password),
    });
    
    return this.getToken({
      userId: id,
      username,
      avatar,
    });
  }

  async getToken (payload: TokenPayload): Promise<TokenResponse> {
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: 60*60*24*7,
    });

    return {
      access_token,
    };
  }

  async updateToken (userId: string): Promise<TokenResponse> {
    const user = await this.userService.getById(userId);
    return this.getToken({
      userId: user.id,
      avatar: user.avatar,
      username: user.username,
    });
  }
}