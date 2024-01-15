import { ApiProperty } from '@nestjs/swagger';

export class OwnerResponse {
  @ApiProperty({
    description: 'User\'s id',
  })
    id: string;
  
  @ApiProperty({
    description: 'User\'s name',
  })
    username: string;

  @ApiProperty({
    description: 'User\'s avatar link',
  })
    avatar: string;
}