import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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
    name: string;

  @ManyToMany(() => RoadmapsEntity, (roadmap) => roadmap.tags, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
    roadmaps: RoadmapsEntity[];
}