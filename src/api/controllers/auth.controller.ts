import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ApiEndpoint } from '../../decorators/ApiEndpoint';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}

  @ApiEndpoint({
    summary: 'login user',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login (@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @ApiEndpoint({
    summary: 'register user',
  })
  @Post('register')
  register (@Body() data: RegisterDTO) {
    return this.authService.register(data);
  }

  @ApiEndpoint({
    summary: 'Verify jwt token',
    isBearer: true,
  })
  @Get('verifyToken')
  verifyToken (@Req() req: Request) {
    return req['user'];
  }
}