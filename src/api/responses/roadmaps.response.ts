import { ApiProperty } from '@nestjs/swagger';
import { RoadmapDifficultyEnum } from '../types/RoadmapDifficulty.type';
import { UserRoadmapState } from '../types/userRoadmapState.type';
import { ReviewResponse } from './reviews.response';
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
    description: 'Roadmap total rating',
  })
    rating: number;

  @ApiProperty({
    description: 'Roadmap total reviews',
  })
    reviewsAmount: number;
  
  @ApiProperty({
    description: 'Date of creating the roadmap',
  })
    created_at: Date; 
  
  @ApiProperty({
    description: 'Array of tags',
    type: [TagsResponse],
  })
    tags: TagsResponse[]; 
  
  @ApiProperty({
    description: 'Array of reviews',
    type: [ReviewResponse],
  })
    reviews: ReviewResponse[];
  
  @ApiProperty({
    description: 'Users states of the roadmaps',
    enum: [UserRoadmapState],
  })
    userStates: UserRoadmapState[];
}

export class RoadmapShortResponse {
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
    description: 'Roadmap total rating',
  })
    rating: number;

  @ApiProperty({
    description: 'Roadmap total reviews',
  })
    reviewsAmount: number;
  
  @ApiProperty({
    description: 'Date of creating the roadmap',
  })
    created_at: Date; 
  
  @ApiProperty({
    description: 'Array of tags',
    type: [TagsResponse],
  })
    tags: TagsResponse[]; 

  @ApiProperty({
    description: 'Users states of the roadmaps',
    enum: [UserRoadmapState],
  })
    userStates: UserRoadmapState[];
}