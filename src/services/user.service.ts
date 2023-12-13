import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/databases/repositories/user.repository';
import { UserCreateDTO } from 'src/dtos/user.create.dto';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class UserService {
  constructor (
    private  userRepository: UserRepository
  ) {}
  
  async create (data: UserCreateDTO) {
    const salt = await genSalt(11);
    const passwordHash = await hash(data.password, salt);
    return this.userRepository.create({
      email: data.email,
      passwordHash,
      username: data.username,
    });
  }

  get (userId: string) {
    return this.userRepository.findById(userId);
  }

  getAll () {
    return this.userRepository.find();
  }
}
