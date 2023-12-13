import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { DatabaseModule } from './database.module';
import { UserMapper } from '../mappers/user.mapper';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserMapper],
})
export class UserModule {}
