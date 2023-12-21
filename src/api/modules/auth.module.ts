import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configuration } from '../../configs/config';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: configuration().server.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}