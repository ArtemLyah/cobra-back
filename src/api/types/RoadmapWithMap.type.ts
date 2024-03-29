import { MapsModel } from 'src/databases/entities/map.model';
import { RoadmapsEntity } from 'src/databases/entities/roadmaps.entity';

export interface FullRoadmap {
  roadmap: RoadmapsEntity,
  map: MapsModel,
}