import { ApiProperty } from '@nestjs/swagger';
import { UserShortResponse } from './user.response';

export class ReviewResponse {
  @ApiProperty({
    description: 'User id',
  })
    userId: string;

  @ApiProperty({
    description: 'Roadmap id',
  })
    roadmapId: string;

  @ApiProperty({
    description: 'Rate for the roadmap',
  })
    rate: number;
  @ApiProperty({
    description: 'Comment for the roadmap',
  })
    text: string;
  
  @ApiProperty({
    description: 'User entity which wrote the review',
    type: UserShortResponse,
  })
    user: UserShortResponse;
}