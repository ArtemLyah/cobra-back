import { Injectable } from '@nestjs/common';
import { TagsEntity } from 'src/databases/entities/tags.entity';
import { UserRoadmapState } from '../../databases/entities/userRoadmaps.entity';
import { RoadmapRepository } from '../../databases/repositories/roadmap.repository';
import { DeepPartial, In } from 'typeorm';
import { RoadmapCreateDTO } from '../dtos/roadmap.create.dto';
import { TagRepository } from 'src/databases/repositories/tag.repository';

@Injectable()
export class RoadmapService {
  constructor (
  private roadmapRepository: RoadmapRepository,
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

  getById (roadmapId: string) {
    return this.roadmapRepository.findById(roadmapId);
  }
  
  getMany () {
    return this.roadmapRepository.find();
  }
}