import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiEndpoint } from '../../decorators/ApiEndpoint';
import { LoginDTO } from '../dtos/login.dto';
import { RegisterDTO } from '../dtos/register.dto';
import { TokenResponse } from '../responses/token.response';
import { UserFromTokenResponse } from '../responses/userFromToken.response';
import { AuthService } from '../services/auth.service';
import { RequestUserData } from '../types/RequestUserData.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor (
    private authService: AuthService,
  ) {}

  @ApiOkResponse({
    type: TokenResponse,
  })
  @ApiUnauthorizedResponse({
    description: `
    UnauthorizedException:
      Wrong email or password
    `,
  })
  @ApiBadRequestResponse({
    description: `
    InvalidBodyException:
      Email cannot be empty
      Email must be in email format
      Password cannot be empty
    `,
  })
  @ApiEndpoint({
    summary: 'login user',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login (@Body() data: LoginDTO): Promise<TokenResponse> {
    return this.authService.login(data);
  }

  @ApiOkResponse({
    type: TokenResponse,
  })
  @ApiBadRequestResponse({
    description: `
    AlreadyRegisteredException:
      User with such email already registered
    
    InvalidBodyException:
      Username cannot be empty
      Username must be string
      Email cannot be empty
      Email must be email
      Password cannot be empty
      Min length of password must be 8
      Max length of password must be 32
      Password is not valid
    `,
  })
  @ApiEndpoint({
    summary: 'register user',
  })
  @Post('register')
  register (@Body() data: RegisterDTO): Promise<TokenResponse> {
    return this.authService.register(data);
  }

  @ApiOkResponse({
    type: UserFromTokenResponse,
  })
  @ApiUnauthorizedResponse({
    description: `
    UnauthorizedException:
      Unauthorized
      Invalid token
      User is unauthorized
    `,
  })
  @ApiForbiddenResponse({
    description: `
    ForbiddenException:
      User is unauthorized
    `,
  })
  @ApiEndpoint({
    summary: 'Verify jwt token',
    isBearer: true,
  })
  @Get('verifyToken')
  verifyToken (@Req() req: RequestUserData): Promise<UserFromTokenResponse> {
    return req.user;
  }
}