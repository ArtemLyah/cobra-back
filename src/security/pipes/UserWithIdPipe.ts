import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityIdException } from '../../utils/exceptions/InvalidEntityIdException';
import { UserRepository } from '../../databases/repositories/user.repository';

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor (
    private userRepository: UserRepository,
  ) {}

  async transform (userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidEntityIdException('User');
    }
    return userId;
  }
}