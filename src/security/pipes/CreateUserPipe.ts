import { Injectable, PipeTransform } from '@nestjs/common';
import { UserRepository } from '../../databases/repositories/user.repository';
import { UserCreateDTO } from '../../dtos/user.create.dto';
import { InvalidUserEmailException } from 'src/utils/exceptions/InvalidUserEmailException';

@Injectable()
export class CreateUserPipe implements PipeTransform<UserCreateDTO, Promise<UserCreateDTO>> {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async transform (data: UserCreateDTO) {
    const user = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new InvalidUserEmailException();
    }

    return data;
  }
}