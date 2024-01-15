import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UserRepository {
  private relations: FindOptionsRelations<UsersEntity> = {
    reviews: true,
    userRoadmaps: true,
  };

  constructor (
    @InjectRepository(UsersEntity)
      private repository: Repository<UsersEntity>,
  ) {}
  
  create (data: DeepPartial<UsersEntity>): Promise<UsersEntity> {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }
  
  find (
    where?: FindOptionsWhere<UsersEntity>, 
    query?: FindManyOptions<UsersEntity>,
  ): Promise<UsersEntity[]> {
    return this.repository.find({
      where,
      relations: this.relations,
      ...query,
    });
  }

  async findOne (
    where?: FindOptionsWhere<UsersEntity>, 
    query?: FindOneOptions<UsersEntity>,
  ): Promise<UsersEntity> {
    return await this.repository.findOne({
      where, 
      relations: this.relations,
      ...query,
    }).catch(() => null);  
  }

  findById (userId: string, query?: FindOneOptions<UsersEntity>): Promise<UsersEntity | null> {
    return this.findOne({
      id: userId,
    }, query);
  }

  async update (
    where: FindOptionsWhere<UsersEntity>, 
    data: Partial<UsersEntity>,
  ): Promise<UsersEntity> {
    const entity = await this.repository.findOne({
      where,
    });
    return this.repository.save({
      ...entity,
      ...data,
    });
  }
  
  updateById (userId: string, query: Partial<UsersEntity>): Promise<UsersEntity> {
    return this.update({
      id: userId,
    }, query);
  }

  delete (where: FindOptionsWhere<UsersEntity>) {
    return this.repository.delete(where);
  }
}