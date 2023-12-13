import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserPipe } from '../security/pipes/CreateUserPipe';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserByIdPipe } from '../security/pipes/UserWithIdPipe';
import { UserService } from '../services/user.service';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserMapper } from '../mappers/user.mapper';
import { UserResponse, UsersResponse } from '../responses/user.response';

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
  @ApiOperation({
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
  @ApiParam({
    name: 'userId',
    description: 'User\'s id',
  })
  @ApiOperation({
    summary: 'return user\'s information',
  })
  @Get('/:userId') 
  async get (@Param('userId', UserByIdPipe) userId: string) {
    const user = await this.userService.get(userId);
    return this.userMapper.get(user);
  }

  @ApiOkResponse({
    type: UserResponse,
  })
  @ApiOperation({
    summary: 'create user',
  })
  @Post()
  async create (@Body(CreateUserPipe) data: UserCreateDTO) {
    const user = await this.userService.create(data);
    return this.userMapper.get(user);
  }
}
