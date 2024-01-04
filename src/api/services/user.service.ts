import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../databases/repositories/user.repository';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserDTO } from '../dtos/user.dto';
import { UserUpdateDTO } from '../dtos/user.update.dto';

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

  update (userId: string, data: UserUpdateDTO) {
    return this.userRepository.updateById(userId, data);
  }

  delete (userId: string) {
    return this.userRepository.delete({
      id: userId,
    });
  }
}
