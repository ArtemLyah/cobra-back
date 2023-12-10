import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoadmapsEntity } from './roadmaps.entity';
import { UsersEntity } from './users.entity';

export enum UserRoadmapState {
  PASSED,
  SIGNED,
  FAVORITE,
  OWNER,
}

@Entity({
  name: 'user_roadmaps',
})
export class UserRoadmapsEntity {
  @PrimaryColumn()
    userId: string;

  @ManyToOne(() => UsersEntity, (user) => user.userRoadmaps, {
    onDelete: 'CASCADE',
  })
    user: UsersEntity;

  @PrimaryColumn()
    roadmapId: string;

  @ManyToOne(() => RoadmapsEntity, (roadmap) => roadmap.userRoadmaps, {
    onDelete: 'CASCADE',
  })
    roadmap: RoadmapsEntity;  

  @Column({
    enum: UserRoadmapState,
  })
    state: UserRoadmapState;
}