import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoadmapsEntity } from './roadmaps.entity';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'review',
})
export class ReviewsEntity {
  @PrimaryColumn()
    userId: string;

  @ManyToOne(() => UsersEntity, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
    user: UsersEntity;

  @PrimaryColumn()
    roadmapId: string;

  @ManyToOne(() => RoadmapsEntity, (roadmap) => roadmap.reviews, {
    onDelete: 'CASCADE',
  })
    roadmap: RoadmapsEntity;

  @Column()
    rate: number;
  
  @Column({
    type: 'text',
  })
    text: string;
}