import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/api/services/user.service';
import { TokenPayload } from 'src/api/types/TokenPayload.type';
import { configuration } from '../../configs/config';

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

    const payload = await this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: configuration().server.secret,
    }).catch(() => {
      throw new UnauthorizedException('Invalid token');
    });

    const user = await this.userService.getById(payload.userId);

    if (!user) {
      throw new ForbiddenException('User is unauthorized');
    }

    request['user'] = payload; 

    return true;
  }

  getTokenFromHeader (request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}