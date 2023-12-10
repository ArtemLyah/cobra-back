import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDTO } from 'src/dtos/user.create.dto';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor (
    private userService: UserService
  ) {}
  
  @Get()
  getAll () {
    return this.userService.getAll();
  }

  @Post()
  create (@Body() data: UserCreateDTO) {
    return this.userService.create(data);
  }
}
