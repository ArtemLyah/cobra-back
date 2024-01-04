import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'User\'s id',
  })
    id: string;
  
  @ApiProperty({
    description: 'User\'s email',
  })
    email: string;
  
  @ApiProperty({
    description: 'User\'s name',
  })
    username: string;

  @ApiProperty({
    description: 'User\'s avatar link',
  })
    avatar: string;
  
  @ApiProperty({
    description: 'When user was created',
  })
    created_at: Date;
}

export class UsersResponse {
  @ApiProperty({
    description: 'List of users',
    type: [UserResponse],
  })
    users: UserResponse[];
}