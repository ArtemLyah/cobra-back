import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../databases/repositories/user.repository';
import { UserCreateDTO } from '../dtos/user.create.dto';
import { UserDTO } from '../dtos/user.dto';
import { UserUpdateDTO } from '../dtos/user.update.dto';
import { UserUpdatePasswordDTO } from '../dtos/user.update.password.dto';
import { matchHash, hashString } from '../../utils/functionUtils';
import { UsersEntity } from 'src/databases/entities/users.entity';

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
      ...user,
    });
  }

  getById (userId: string) {
    return this.userRepository.findById(userId);
  }

  getAll () {
    return this.userRepository.find();
  }

  updateById (userId: string, data: UserUpdateDTO): Promise<UsersEntity> {
    return this.userRepository.updateById(userId, data);
  }
  
  async updatePassword (userId: string, data: UserUpdatePasswordDTO): Promise<UsersEntity> {
    const user = await this.userRepository.findById(userId);

    if (!await matchHash(data.oldPassword, user.passwordHash)) {
      throw new UnauthorizedException('Wrong password');
    }
    
    return this.userRepository.updateById(userId, {
      passwordHash: await hashString(data.newPassword),
    });
  }

  delete (userId: string) {
    return this.userRepository.delete({
      id: userId,
    });
  }
}

