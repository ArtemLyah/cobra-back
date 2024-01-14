import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../modules/database.module';
import { configuration } from '../../configs/config';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { RoadmapModule } from './roadmap.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: configuration().server.secret,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    UserModule, 
    RoadmapModule,
    DatabaseModule,
  ],
})
export class AppModule {}
