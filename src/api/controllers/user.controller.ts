import { Body, Controller, Delete, Get, Patch, Req } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserMapper } from '../mappers/user.mapper';
import { UserResponse, UsersResponse } from '../responses/user.response';
import { ApiEndpoint } from '../../decorators/ApiEndpoint';
import { UserUpdateDTO } from '../dtos/user.update.dto';
import { OkResponse } from '../responses/ok.response';
import { UserUpdatePasswordDTO } from '../dtos/user.update.password.dto';
import { RequestUserData } from '../types/RequestUserData.type';
import { TokenPayload } from '../types/TokenPayload.type';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor (
    private userService: UserService,
    private userMapper: UserMapper,
  ) {}
  
  @ApiOkResponse({
    type: UsersResponse,
  })
  @ApiEndpoint({
    summary: 'return all users',
  })
  @Get('/')
  async getAll () {
    const users = await this.userService.getAll();
    return this.userMapper.getAll(users);
  }

  @ApiOkResponse({
    type: UserResponse,
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
    summary: 'return user\'s information',
    isBearer: true,
  })
  @Get('/me') 
  async getMe (@Req() req: RequestUserData<TokenPayload>) {
    const user = await this.userService.getById(req.user.userId);
    return this.userMapper.get(user);
  }
  
  @ApiOkResponse({
    type: UserResponse,
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
  @ApiBadRequestResponse({
    description: `
    InvalidBodyException:
      Username must be string
      Email must be email
      Link of the avatar is not valid
    `,
  })
  @ApiEndpoint({
    summary: 'Update user info',
    isBearer: true,
  })
  @Patch('/update') 
  async update (
    @Req() req: RequestUserData<TokenPayload>,
    @Body() data: UserUpdateDTO,
  ): Promise<UserResponse> {
    const user = await this.userService.update(req.user.userId, data);
    return this.userMapper.get(user);
  }
  
  @ApiOkResponse({
    type: OkResponse,
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
  @ApiBadRequestResponse({
    description: `
    InvalidBodyException:
      Password cannot be empty
      Min length of password must be 8
      Max length of password must be 32
      Password is not valid
    `,
  })
  @ApiEndpoint({
    summary: 'Update user\'s password',
    isBearer: true,
  })
  @Patch('/updatePassword') 
  async updatePassword (
    @Req() req: RequestUserData<TokenPayload>,
    @Body() data: UserUpdatePasswordDTO,
  ): Promise<OkResponse> {
    await this.userService.updatePassword(req.user.userId, data);
    return {
      message: 'Ok',
    };
  }

  @ApiOkResponse({
    type: OkResponse,
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
    summary: 'Delete user',
    isBearer: true,
  })
  @Delete('/deleteAccount') 
  async delete (
    @Req() req: RequestUserData<TokenPayload>,
  ): Promise<OkResponse> {
    await this.userService.delete(req.user.userId);
    return {
      message: 'Ok',
    };
  }
}
