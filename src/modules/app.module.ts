import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/modules/database.module';
import { configuration } from '../configs/config';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
