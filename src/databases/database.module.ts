import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoConfig, postgresConfig } from '../configs/config';
import { ReviewsEntity } from './entities/review.entity';
import { RoadmapsEntity } from './entities/roadmaps.entity';
import { TagsEntity } from './entities/tags.entity';
import { UsersEntity } from './entities/users.entity';
import { UserRoadmapsEntity } from './entities/user_roadmaps.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      postgresConfig([
        UsersEntity, 
        RoadmapsEntity, 
        ReviewsEntity, 
        UserRoadmapsEntity,
        TagsEntity, 
      ]) 
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