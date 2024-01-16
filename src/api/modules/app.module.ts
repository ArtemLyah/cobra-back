import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../modules/database.module';
import { configuration } from '../../configs/config';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { RoadmapModule } from './roadmap.module';
import { JwtModule } from '@nestjs/jwt';
import { ReviewModule } from './review.module';

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
    DatabaseModule,
    AuthModule,
    UserModule, 
    RoadmapModule,
    ReviewModule,
  ],
})
export class AppModule {}
