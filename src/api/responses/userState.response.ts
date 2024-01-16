import { ApiProperty } from '@nestjs/swagger';
import { UserRoadmapState } from '../types/userRoadmapState.type';

export class UserStateResponse {
  userId: string;
  roadmapId: string;
  
  @ApiProperty({
    description: 'User relation for the roadmap',
    enum: UserRoadmapState,
  })
    state: UserRoadmapState;
}