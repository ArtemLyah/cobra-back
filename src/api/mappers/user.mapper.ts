import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../databases/entities/users.entity';

@Injectable()
export class UserMapper {
  get (user: UsersEntity) {
    return {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      passwordHash: user.passwordHash,
    };
  }

  getAll (users: UsersEntity[]) {
    return {
      users: users.map((user) => this.get(user)),
    };
  }
}