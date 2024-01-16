import { UserRoadmapState } from '../../api/types/userRoadmapState.type';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoadmapsEntity } from './roadmaps.entity';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'user_roadmaps',
})
export class UserRoadmapsEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({
    type: 'uuid',
  })
    userId: string;

  @ManyToOne(() => UsersEntity, (user) => user.userRoadmaps, {
    onDelete: 'CASCADE',
  })
    user: UsersEntity;

  @Column({
    type: 'uuid',
  })
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