import { Global, Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [UserService],
})
export class AuthModule {}