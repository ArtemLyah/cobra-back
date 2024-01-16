import { IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/validation';
import { RoadmapDifficultyEnum } from '../types/RoadmapDifficulty.type';

export class RoadmapFilterByDTO {
  @IsOptional()
    name?: string;
  
  @IsOptional()
  @IsNumber(undefined, validationOptionsMsg('Rating must be number'))
    rating?: number;
  
  @IsOptional()
    difficulty?: RoadmapDifficultyEnum[];
}