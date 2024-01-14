import { Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoadmapsEntity } from './roadmaps.entity';

@Entity({
  name: 'tags',
})
export class TagsEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({
    length: 60,
  })
  @Index({
    unique: true,
  })
    name: string;

  @ManyToMany(() => RoadmapsEntity, (roadmap) => roadmap.tags, {
    onDelete: 'CASCADE',
  })
    roadmaps: RoadmapsEntity[];
}