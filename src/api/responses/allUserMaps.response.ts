import { ApiProperty } from '@nestjs/swagger';
import { RoadmapShortResponse } from './roadmaps.response';

export class AllUserMapsResponse {
  @ApiProperty({
    description: 'User favorite roadmaps',
    type: [RoadmapShortResponse],
  })
    favorite: RoadmapShortResponse[];

  @ApiProperty({
    description: 'User owned roadmaps',
    type: [RoadmapShortResponse],
  })
    owned: RoadmapShortResponse[];
  
  @ApiProperty({
    description: 'User signed roadmaps',
    type: [RoadmapShortResponse],
  })
    signed: RoadmapShortResponse[];
}