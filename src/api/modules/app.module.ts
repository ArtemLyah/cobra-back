import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../modules/database.module';
import { configuration } from '../../configs/config';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
