import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { configuration } from '../../configs/config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor (
    private jwtService: JwtService,
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configuration().server.secret,
      });
  
      request['user_id'] = payload;
    } 
    catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  getTokenFromHeader (request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}