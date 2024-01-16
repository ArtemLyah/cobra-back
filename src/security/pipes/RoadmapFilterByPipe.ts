import { Injectable, PipeTransform } from '@nestjs/common';
import { RoadmapDifficultyEnum } from '../../api/types/RoadmapDifficulty.type';
import { RoadmapFilterByDTO } from '../../api/dtos/roadmapFilterBy.dto';

class FilterBy {
  name?: string;
  difficulty?: RoadmapDifficultyEnum[];
  rating?: string;
}

@Injectable()
export class RoadmapFilterByPipe implements PipeTransform<FilterBy, RoadmapFilterByDTO> {
  transform (filterBy: FilterBy): RoadmapFilterByDTO {
    const rating = parseInt(filterBy.rating); 
    return {
      name: filterBy.name,
      difficulty: filterBy.difficulty,
      rating: rating ? rating : 0,
    };
  }
}