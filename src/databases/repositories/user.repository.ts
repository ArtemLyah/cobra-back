import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UserRepository {
  constructor (
    @InjectRepository(UsersEntity)
      private repository: Repository<UsersEntity>
  ) {}
  
  async create (data: DeepPartial<UsersEntity>) {
    const user = this.repository.create(data);
    return await this.repository.save(user);
  }
  
  find (query?: FindManyOptions<UsersEntity>) {
    return this.repository.find(query);
  }
}