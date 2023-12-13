import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UserRepository {
  private relations = {
    reviews: true,
    userRoadmaps: true,
  };

  constructor (
    @InjectRepository(UsersEntity)
      private repository: Repository<UsersEntity>
  ) {}
  
  async create (data: DeepPartial<UsersEntity>) {
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }
  
  find (query?: FindManyOptions<UsersEntity>) {
    return this.repository.find({
      relations: this.relations,
      ...query,
    });
  }

  async findOne (query?: FindOneOptions<UsersEntity>) {
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

  findById (userId: string) {
    return this.findOne({
      where: {
        id: userId,
      },
    });
  }
}