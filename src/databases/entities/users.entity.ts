import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewsEntity } from './review.entity';
import { RoadmapsEntity } from './roadmaps.entity';
import { UserRoadmapsEntity } from './userRoadmaps.entity';

@Entity({
  name: 'users',
})
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({
    length: 100,
  })
    username: string;

  @Column({
    unique: true,
  })
  @Index({
    unique: true,
  })
    email: string;
  
  @Column({
    type: 'text',
  })
    passwordHash: string;
  
  @Column({
    nullable: true,
  })
    avatar: string;

  @OneToMany(() => UserRoadmapsEntity, (userRoadmaps) => userRoadmaps.user, {
    onDelete: 'CASCADE',
  })
    userRoadmaps: UserRoadmapsEntity[];
  
  @OneToMany(() => RoadmapsEntity, (roadmaps) => roadmaps.owner, {
    onDelete: 'CASCADE',
    nullable: true,
  })
    roadmaps: RoadmapsEntity[];
  
  @OneToMany(() => ReviewsEntity, (reviews) => reviews.user, {
    onDelete: 'CASCADE',
  })
    reviews: ReviewsEntity[];

  @CreateDateColumn()
    created_at: Date;
}