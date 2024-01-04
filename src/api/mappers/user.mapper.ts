import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../databases/entities/users.entity';

@Injectable()
export class UserMapper {
  get (user: UsersEntity) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      created_at: user.created_at,
    };
  }

  getAll (users: UsersEntity[]) {
    return {
      users: users.map((user) => this.get(user)),
    };
  }
}