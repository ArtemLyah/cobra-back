import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { TagsEntity } from '../entities/tags.entity';

@Injectable()
export class TagRepository {
  private relations: FindOptionsRelations<TagsEntity> = {
    roadmaps: true,
  };
  
  constructor (
    @InjectRepository(TagsEntity)
      private repository: Repository<TagsEntity>,
  ) {}

  find (
    where?: FindOptionsWhere<TagsEntity>, 
    query?: FindManyOptions<TagsEntity>,
  ): Promise<TagsEntity[]> {
    return this.repository.find({
      where,
      relations: this.relations, 
      ...query,
    });
  }

  findOne (
    where: FindOptionsWhere<TagsEntity>, 
    query?: FindOneOptions<TagsEntity>,
  ): Promise<TagsEntity> {
    return this.repository.findOne({
      where,
      relations: this.relations,
      ...query,
    });
  }

  findById (roadmapId: string, query?: FindOneOptions<TagsEntity>): Promise<TagsEntity> {
    return this.findOne({
      id: roadmapId,
    }, query);
  }
}