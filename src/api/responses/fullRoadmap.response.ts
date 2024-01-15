import { ApiProperty } from '@nestjs/swagger';
import { OwnerResponse } from './owner.response';
import { RoadmapResponse } from './roadmaps.response';

export class FullRoadmapResponse extends RoadmapResponse {
  @ApiProperty({
    description: 'Structure of the roadmap',
  })
    map: Object;
  
  @ApiProperty({
    description: 'Roadmap owner',
    type: OwnerResponse,
  })
    owner: OwnerResponse;
}