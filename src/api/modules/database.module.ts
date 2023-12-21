import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoConfig, postgresConfig } from '../../configs/config';
import { ReviewsEntity } from '../../databases/entities/review.entity';
import { RoadmapsEntity } from '../../databases/entities/roadmaps.entity';
import { TagsEntity } from '../../databases/entities/tags.entity';
import { UsersEntity } from '../../databases/entities/users.entity';
import { UserRoadmapsEntity } from '../../databases/entities/user_roadmaps.entity';
import { UserRepository } from '../../databases/repositories/user.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(
      postgresConfig([
        UsersEntity, 
        RoadmapsEntity, 
        ReviewsEntity, 
        UserRoadmapsEntity,
        TagsEntity, 
      ]),
    ),
    TypeOrmModule.forFeature([
      UsersEntity, 
      RoadmapsEntity, 
      ReviewsEntity, 
      UserRoadmapsEntity,
      TagsEntity, 
    ]),
    MongooseModule.forRoot(mongoConfig()),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}