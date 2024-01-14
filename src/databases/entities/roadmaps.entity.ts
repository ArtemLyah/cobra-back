import { RoadmapDifficultyEnum } from '../../api/types/RoadmapDifficulty.type';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ReviewsEntity } from './review.entity';
import { TagsEntity } from './tags.entity';
import { UserRoadmapsEntity } from './userRoadmaps.entity';
import { UsersEntity } from './users.entity';

@Entity({
  name: 'roadmaps',
})
export class RoadmapsEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    title: string;
    
  @Column({
    type: 'text',
  })
    description: string;

  @Column({
    enum: RoadmapDifficultyEnum,
  })
    difficulty: RoadmapDifficultyEnum;
 
  @ManyToMany(() => TagsEntity, (tag) => tag.roadmaps, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinTable({ name: 'roadmap_tags' })
    tags: TagsEntity[];

  @OneToMany(() => UserRoadmapsEntity, (userRoadmaps) => userRoadmaps.roadmap, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
    userRoadmaps: UserRoadmapsEntity[];
  
  @ManyToOne(() => UsersEntity, (users) => users.roadmaps, {
    onDelete: 'SET NULL',
  })
    owner: UsersEntity;

  @OneToMany(() => ReviewsEntity, (reviews) => reviews.roadmap, {
    onDelete: 'CASCADE',
  })
    reviews: ReviewsEntity[];

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}