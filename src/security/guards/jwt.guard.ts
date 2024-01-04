import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/api/services/user.service';
import { configuration } from '../../configs/config';

interface UserPayload {
  user_id: string;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor (
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
      secret: configuration().server.secret,
    }).catch(() => {
      throw new UnauthorizedException('Invalid token');
    });

    const user = await this.userService.getById(payload.user_id);

    if (!user) {
      throw new UnauthorizedException('User is unauthorized');
    }

    request['user'] = {
      user_id: user.id,
      username: user.username,
      avatar: user.avatar,
    }; 

    return true;
  }

  getTokenFromHeader (request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}