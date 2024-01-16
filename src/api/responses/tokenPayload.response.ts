import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadResponse {
  @ApiProperty({
    description: 'User\'s id',
  })
    userId: string;
    
  @ApiProperty({
    description: 'User\'s name',
  })
    username: string;

  @ApiProperty({
    description: 'User\'s avatar link',
  })
    avatar: string;
}