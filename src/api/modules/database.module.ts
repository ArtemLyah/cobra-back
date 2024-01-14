import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapsModel, MapsSchema } from '../../databases/entities/map.model';
import { mongoConfig, postgresConfig } from '../../configs/config';
import { ReviewsEntity } from '../../databases/entities/review.entity';
import { RoadmapsEntity } from '../../databases/entities/roadmaps.entity';
import { TagsEntity } from '../../databases/entities/tags.entity';
import { UsersEntity } from '../../databases/entities/users.entity';
import { UserRoadmapsEntity } from '../../databases/entities/userRoadmaps.entity';
import { UserRepository } from '../../databases/repositories/user.repository';
import { UserProgressModel, UserProgressSchema } from '../../databases/entities/userProgress.model';
import { RoadmapRepository } from '../../databases/repositories/roadmap.repository';
import { TagRepository } from '../../databases/repositories/tag.repository';

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
    MongooseModule.forFeature([
      { name: MapsModel.name, schema: MapsSchema, collection: 'maps' },
      { name: UserProgressModel.name, schema: UserProgressSchema, collection: 'userProgress' },
    ]),
  ],
  providers: [UserRepository, RoadmapRepository, TagRepository],
  exports: [UserRepository, RoadmapRepository, TagRepository],
})
export class DatabaseModule {}