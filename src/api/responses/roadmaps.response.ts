import { ApiProperty } from '@nestjs/swagger';
import { RoadmapDifficultyEnum } from '../types/RoadmapDifficulty.type';
import { TagsResponse } from './tags.response';

export class RoadmapResponse {
  @ApiProperty({
    description: 'Roadmap id',
  })
    id: string;
  
  @ApiProperty({
    description: 'Roadmap title',
  })
    title: string;
  
  @ApiProperty({
    description: 'Roadmap description',
  })
    description: string;
  
  @ApiProperty({
    description: 'Roadmap difficulty',
    enum: RoadmapDifficultyEnum,
  })
    difficulty: RoadmapDifficultyEnum;
  
  @ApiProperty({
    description: 'Date of creating the roadmap',
  })
    created_at: Date; 
  
  @ApiProperty({
    description: 'Array of tags',
    type: [TagsResponse],
  })
    tags: TagsResponse[]; 
}