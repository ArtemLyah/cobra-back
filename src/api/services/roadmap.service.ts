import { Injectable } from '@nestjs/common';
import { TagsEntity } from 'src/databases/entities/tags.entity';
import { UserRoadmapState } from '../../databases/entities/userRoadmaps.entity';
import { RoadmapRepository } from '../../databases/repositories/roadmap.repository';
import { DeepPartial, In } from 'typeorm';
import { RoadmapCreateDTO } from '../dtos/roadmap.create.dto';
import { TagRepository } from '../../databases/repositories/tag.repository';
import { FullRoadmapCreateDTO } from '../dtos/fullRoadmap.create.dto';
import { MapRepository } from '../../databases/repositories/map.repository';
import { RoadmapWithMap } from '../types/RoadmapWithMap.type';

@Injectable()
export class RoadmapService {
  constructor (
  private roadmapRepository: RoadmapRepository,
  private mapRepository: MapRepository,
  private tagRepository: TagRepository,
  ) {}

  async create (userId: string, data: RoadmapCreateDTO) {
    const foundTags = await this.tagRepository.find({
      name: In(data.tags),
    });

    let tags: DeepPartial<TagsEntity[]> = foundTags.length ? foundTags : [];
    if (tags.length !== data.tags.length) {
      tags = data.tags.map((tagName) => {
        return foundTags.find((tag) => tag.name === tagName) ?? {
          name: tagName,
        };
      });
    }

    return this.roadmapRepository.create({
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      owner: {
        id: userId,
      },
      tags,
      userRoadmaps: [{
        userId,
        state: UserRoadmapState.OWNER,
      }],
    });
  }

  async createWithMap (userId: string, data: FullRoadmapCreateDTO) {
    const roadmap = await this.create(userId, data);
    await this.mapRepository.create({
      roadmap_id: roadmap.id,
      structure: JSON.stringify(data.structure),
    });
    return roadmap;
  }

  getById (roadmapId: string) {
    return this.roadmapRepository.findById(roadmapId);
  }
  
  getMany () {
    return this.roadmapRepository.find();
  } 

  async getWithMap (roadmapId: string): Promise<RoadmapWithMap> {
    const map = await this.mapRepository.findById(roadmapId);
    const roadmap = await this.roadmapRepository.findById(roadmapId, {
      relations: {
        owner: true,
        tags: true,
      },
    });
    return {
      roadmap,
      map,
    };
  }
}