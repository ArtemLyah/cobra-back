import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReviewsEntity } from './review.entity';
import { UserRoadmapsEntity } from './user_roadmaps.entity';

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
    onDelete: 'NO ACTION',
  })
    userRoadmaps: UserRoadmapsEntity[];
  
  @OneToMany(() => ReviewsEntity, (reviews) => reviews.user, {
    onDelete: 'NO ACTION',
  })
    reviews: ReviewsEntity[];

  @CreateDateColumn()
    created_at: Date;
}