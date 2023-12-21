import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AlreadyRegisteredException } from 'src/utils/exceptions/AlreadyRegisteredException';
import { hashString, matchHash } from '../../utils/functionUtils';
import { RegisterDTO } from '../dtos/register.dto';
import { LoginDTO } from '../dtos/login.dto';
import { UserService } from './user.service';

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
    
    const result = await this.jwtService.signAsync({
      user_id: user.id,
    });
    return {
      access_token: result,
    };
  }

  async register (data: RegisterDTO) {
    const user = await this.userService.get({
      email: data.email,
    });
    if (user) {
      throw new AlreadyRegisteredException();
    }

    const { id } = await this.userService.create({
      ...data,
      password: await hashString(data.password),
    });
    const result = await this.jwtService.signAsync({
      user_id: id,
    });
    
    return {
      access_token: result,
    };
  }
}