import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserByIdPipe } from '../../security/pipes/UserWithIdPipe';
import { UserService } from '../services/user.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserMapper } from '../mappers/user.mapper';
import { UserResponse, UsersResponse } from '../responses/user.response';
import { ApiEndpoint } from '../../decorators/ApiEndpoint';
import { UserUpdateDTO } from '../dtos/user.update.dto';
import { OkResponse } from '../responses/ok.response';

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
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      User with such id is not found
    `,
  })
  @ApiParam({
    name: 'userId',
    description: 'User\'s id',
  })
  @ApiEndpoint({
    summary: 'return user\'s information',
    isBearer: true,
  })
  @Get('/:userId') 
  async get (@Param('userId', UserByIdPipe) userId: string) {
    const user = await this.userService.getById(userId);
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
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      User with such id is not found

    InvalidBodyException:
      Username must be string
      Link of the avatar is not valid
    `,
  })
  @ApiParam({
    name: 'userId',
    description: 'User\'s id',
  })
  @ApiEndpoint({
    summary: 'Update user info',
    isBearer: true,
  })
  @Patch('/:userId') 
  async update (
    @Param('userId', UserByIdPipe) userId: string,
    @Body() data: UserUpdateDTO,
  ): Promise<UserResponse> {
    const user = await this.userService.update(userId, data);
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
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      User with such id is not found
    `,
  })
  @ApiEndpoint({
    summary: 'Delete user',
    isBearer: true,
  })
  @ApiParam({
    name: 'userId',
    description: 'User\'s id',
  })
  @Delete('/:userId') 
  async delete (
    @Param('userId', UserByIdPipe) userId: string,
  ): Promise<OkResponse> {
    await this.userService.delete(userId);
    return {
      message: 'Ok',
    };
  }
}
