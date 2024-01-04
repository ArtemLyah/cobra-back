import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UserRepository {
  private relations = {
    reviews: true,
    userRoadmaps: true,
  };

  constructor (
    @InjectRepository(UsersEntity)
      private repository: Repository<UsersEntity>,
  ) {}
  
  async create (data: DeepPartial<UsersEntity>):  Promise<UsersEntity> {
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }
  
  find (query?: FindManyOptions<UsersEntity>): Promise<UsersEntity[]> {
    return this.repository.find({
      relations: this.relations,
      ...query,
    });
  }

  async findOne (query?: FindOneOptions<UsersEntity>): Promise<UsersEntity> {
    let response: UsersEntity;
    try {
      response = await this.repository.findOne({
        relations: this.relations,
        ...query,
      });  
    } 
    catch (error) {
      response = null;
    }
    return response;
  }

  findById (userId: string): Promise<UsersEntity|null> {
    return this.findOne({
      where: {
        id: userId,
      },
    });
  }

  async update (where: FindOneOptions<UsersEntity>, data: DeepPartial<UsersEntity>) {
    const entity = await this.repository.findOne(where);
    return this.repository.save({
      ...entity,
      ...data,
    });
  }
  
  updateById (userId: string, query: DeepPartial<UsersEntity>) {
    return this.update({
      where: {
        id: userId,
      },
    }, query);
  }

  delete (where: FindOptionsWhere<UsersEntity>) {
    return this.repository.delete(where);
  }
}