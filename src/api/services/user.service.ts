import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../databases/repositories/user.repository';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor (
    private  userRepository: UserRepository,
  ) {}
  
  async create (data: UserCreateDTO) {
    return this.userRepository.create({
      email: data.email,
      username: data.username,
      passwordHash: data.password,
    });
  }

  get (user: UserDTO) {
    return this.userRepository.findOne({
      where: {
        ...user,
      },
    });
  }

  getById (userId: string) {
    return this.userRepository.findById(userId);
  }

  getAll () {
    return this.userRepository.find();
  }

  deleteAll () {
    return this.userRepository.deleteAll();
  } 
}
