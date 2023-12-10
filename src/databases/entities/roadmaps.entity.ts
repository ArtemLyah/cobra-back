import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewsEntity } from './review.entity';
import { TagsEntity } from './tags.entity';
import { UserRoadmapsEntity } from './user_roadmaps.entity';

export enum RoadmapDifficultyEnum {
  BEGINNER,
  JUNIOR,
  MIDDLE,
  SENIOR,
}

@Entity({
  name: 'roadmaps',
})
export class RoadmapsEntity {
  @PrimaryGeneratedColumn('uuid')
    id: number;

  @Column()
    title: string;
    
  @Column({
    type: 'text',
  })
    description: string;

  @Column({
    nullable: true,
  })
    avatar: string;
  
  @CreateDateColumn({
    type: 'date',
  })
    created_at: Date;

  @Column({
    enum: RoadmapDifficultyEnum,
  })
    difficulty: RoadmapDifficultyEnum;

  @ManyToMany(() => TagsEntity, (tag) => tag.roadmaps, {
    onDelete: 'SET NULL',
  })
    tags: TagsEntity[];

  @OneToMany(() => UserRoadmapsEntity, (userRoadmaps) => userRoadmaps.roadmap, {
    onDelete: 'NO ACTION',
  })
    userRoadmaps: UserRoadmapsEntity[];
  
  @OneToMany(() => ReviewsEntity, (reviews) => reviews.roadmap, {
    onDelete: 'NO ACTION',
  })
    reviews: ReviewsEntity[];
}