import { RoadmapsEntity } from 'src/databases/entities/roadmaps.entity';
import { RoadmapResponse } from '../responses/roadmaps.response';

export class RoadmapMapper {
  get (roadmap: RoadmapsEntity): RoadmapResponse {
    return {
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description,
      difficulty: roadmap.difficulty,
      created_at: roadmap.created_at,
      tags: roadmap.tags,
    };
  }
  
  getMany (roadmaps: RoadmapsEntity[]): RoadmapResponse[] {
    return roadmaps.map((roadmap) => this.get(roadmap));
  }
}