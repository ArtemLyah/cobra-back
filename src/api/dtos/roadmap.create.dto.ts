import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { validationOptionsMsg } from 'src/utils/validation';
import { RoadmapDifficultyEnum } from '../types/RoadmapDifficulty.type';

export class RoadmapCreateDTO {
  @ApiProperty({
    description: 'Roadmap title',
  })
  @IsNotEmpty(validationOptionsMsg('Title cannot be empty'))
    title: string;
  
  @ApiProperty({
    description: 'Roadmap description',
  })
  @IsNotEmpty(validationOptionsMsg('Description cannot be empty'))
    description: string;
  
  @ApiProperty({
    description: 'Roadmap difficulty',
    enum: RoadmapDifficultyEnum,
  })
  @IsNotEmpty(validationOptionsMsg('Difficulty cannot be empty'))
  @IsEnum(RoadmapDifficultyEnum, validationOptionsMsg('Difficulty must have enum values'))
    difficulty: RoadmapDifficultyEnum;
  
  @ApiProperty({
    description: 'Roadmap tags',
  })
  @IsNotEmpty(validationOptionsMsg('Tags cannot be empty'))
  @Matches(/#\w+/, {
    each: true,
    ...validationOptionsMsg('Tags must starts with #'),
  })
    tags: string[];
}