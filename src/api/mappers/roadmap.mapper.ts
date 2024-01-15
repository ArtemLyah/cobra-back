import { RoadmapsEntity } from 'src/databases/entities/roadmaps.entity';
import { FullRoadmapResponse } from '../responses/fullRoadmap.response';
import { RoadmapResponse } from '../responses/roadmaps.response';
import { RoadmapWithMap } from '../types/RoadmapWithMap.type';

export class RoadmapMapper {
  get (roadmap: RoadmapsEntity): RoadmapResponse {
    return {
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description,
      difficulty: roadmap.difficulty,
      created_at: roadmap.created_at,
      tags: roadmap.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    };
  }
  
  getMany (roadmaps: RoadmapsEntity[]): RoadmapResponse[] {
    return roadmaps.map((roadmap) => this.get(roadmap));
  }

  getWithMap ({
    roadmap,
    map,
  }: RoadmapWithMap): FullRoadmapResponse {
    return {
      ...this.get(roadmap),
      owner: {
        id: roadmap.owner.id,
        username: roadmap.owner.username,
        avatar: roadmap.owner.avatar,
      },
      map: JSON.parse(map.structure),
    };
  }
}