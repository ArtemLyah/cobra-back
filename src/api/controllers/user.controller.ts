import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserByIdPipe } from '../../security/pipes/UserWithIdPipe';
import { UserService } from '../services/user.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserMapper } from '../mappers/user.mapper';
import { UserResponse, UsersResponse } from '../responses/user.response';
import { ApiEndpoint } from '../../decorators/ApiEndpoint';

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
    summary: 'returns all users',
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

  @Delete('/')
  async deleteAll () {
    await this.userService.deleteAll();
  }
}
