import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { UserRoadmapsEntity } from '../entities/userRoadmaps.entity';

export class UserRoadmapRepository {
  constructor (
    @InjectRepository(UserRoadmapsEntity)
      private repository: Repository<UserRoadmapsEntity>,
  ) {}
  
  create (data: DeepPartial<UserRoadmapsEntity>) {
    const userRoadmap = this.repository.create(data);
    return this.repository.save(userRoadmap);
  }

  find (
    where?: FindOptionsWhere<UserRoadmapsEntity>, 
    query?: FindManyOptions<UserRoadmapsEntity>,
  ) {
    return this.repository.find({
      where,
      ...query,
    });
  }

  findOne (
    where: FindOptionsWhere<UserRoadmapsEntity>,
    query?: FindOneOptions<UserRoadmapsEntity>,   
  ) {
    return this.repository.findOne({
      where,
      ...query,
    }).catch(() => null);
  }

  async delete (where: FindOptionsWhere<UserRoadmapsEntity>) {
    return this.repository.delete(where);
  }
}