import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { RoadmapsEntity } from '../entities/roadmaps.entity';

@Injectable()
export class RoadmapRepository {
  private relations: FindOptionsRelations<RoadmapsEntity> = {
    userRoadmaps: {
      user: true,
    },
    reviews: true,
    tags: true,
    owner: true,
  };
  
  constructor (
    @InjectRepository(RoadmapsEntity)
      private repository: Repository<RoadmapsEntity>,
  ) {}

  create (data: DeepPartial<RoadmapsEntity>): Promise<RoadmapsEntity> {
    const roadmap = this.repository.create(data);
    return this.repository.save(roadmap);
  }

  find (
    where?: FindOptionsWhere<RoadmapsEntity>, 
    query?: FindManyOptions<RoadmapsEntity>,
  ): Promise<RoadmapsEntity[]> {
    return this.repository.find({
      where,
      relations: this.relations, 
      ...query,
    });
  }

  findOne (
    where: FindOptionsWhere<RoadmapsEntity>, 
    query?: FindOneOptions<RoadmapsEntity>,
  ): Promise<RoadmapsEntity> {
    return this.repository.findOne({
      where,
      relations: this.relations,
      ...query,
    }).catch(() => null);
  }

  findById (roadmapId: string, query?: FindOneOptions<RoadmapsEntity>): Promise<RoadmapsEntity> {
    return this.findOne({
      id: roadmapId,
    }, query);
  }

  async update (
    where: FindOptionsWhere<RoadmapsEntity>, 
    data: DeepPartial<RoadmapsEntity>,
  ): Promise<RoadmapsEntity> {
    const roadmap = await this.findOne(where);
    return this.repository.save({
      ...roadmap,
      ...data,
    });
  }

  updateById (roadmapId: string, query: Partial<RoadmapsEntity>) {
    return this.update({
      id: roadmapId,
    }, query);
  }

  delete (where: FindOptionsWhere<RoadmapsEntity>) {
    return this.repository.delete(where);
  }

  createQuery () {
    return this.repository.createQueryBuilder('roadmaps');
  }
}