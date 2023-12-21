import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { UserMapper } from '../mappers/user.mapper';

@Module({
  controllers: [UserController],
  providers: [UserService, UserMapper],
  exports: [UserService, UserMapper],
})
export class UserModule {}
