import { ForbiddenException, Injectable } from '@nestjs/common';
import { TagsEntity } from 'src/databases/entities/tags.entity';
import { UserRoadmapsEntity } from '../../databases/entities/userRoadmaps.entity';
import { RoadmapRepository } from '../../databases/repositories/roadmap.repository';
import { DeepPartial, In, Raw } from 'typeorm';
import { RoadmapCreateDTO } from '../dtos/roadmap.create.dto';
import { TagRepository } from '../../databases/repositories/tag.repository';
import { FullRoadmapCreateDTO } from '../dtos/fullRoadmap.create.dto';
import { MapRepository } from '../../databases/repositories/map.repository';
import { FullRoadmap } from '../types/RoadmapWithMap.type';
import { UserRoadmapRepository } from '../../databases/repositories/userRoadmap.repository';
import { RoadmapsEntity } from '../../databases/entities/roadmaps.entity';
import { RoadmapFilterByDTO } from '../dtos/roadmapFilterBy.dto';
import { RoadmapDifficultyEnum } from '../types/RoadmapDifficulty.type';
import { UserRoadmapState } from '../types/userRoadmapState.type';
import { OkResponse } from '../responses/ok.response';
import { RoadmapSortBy } from '../types/RoadmapSortBy.type';

@Injectable()
export class RoadmapService {
  constructor (
  private roadmapRepository: RoadmapRepository,
  private mapRepository: MapRepository,
  private tagRepository: TagRepository,
  private userRoadmapRepository: UserRoadmapRepository,
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
    return this.roadmapRepository.findById(roadmapId, {
      relations: {
        userRoadmaps: true,
        owner: true,
        tags: true,
        reviews: {
          user: true,
        },
      },
    });
  }
  
  getMany (filterBy?: RoadmapFilterByDTO, sortBy: RoadmapSortBy): Promise<RoadmapsEntity[]> {
    const findTitle = filterBy.name ? {
      title: Raw(alias => `LOWER(${alias}) Like LOWER('%${filterBy.name}%')`),
    } : {};
    return this.roadmapRepository.find({
      ...findTitle,
      difficulty: In(filterBy.difficulty ?? [
        RoadmapDifficultyEnum.BEGINNER,
        RoadmapDifficultyEnum.JUNIOR,
        RoadmapDifficultyEnum.MIDDLE,
        RoadmapDifficultyEnum.SENIOR,
      ]),
    }, {
      order: {
        
      }
    });
  } 

  async getWithMap (roadmapId: string): Promise<FullRoadmap> {
    const map = await this.mapRepository.findById(roadmapId);
    const roadmap = await this.roadmapRepository.findById(roadmapId, {
      relations: {
        userRoadmaps: true,
        owner: true,
        tags: true,
        reviews: {
          user: true,
        },
      },
    });
    return {
      roadmap,
      map,
    };
  }

  async setUserState (
    roadmapId: string, 
    userId: string, 
    state: UserRoadmapState,
  ): Promise<UserRoadmapsEntity> {
    if (state === UserRoadmapState.OWNER) {
      throw new ForbiddenException('Cannot assign state as owner of the roadmap');
    }
    const userState = await this.userRoadmapRepository.findOne({
      roadmapId,
      userId,
      state,
    });

    if (userState) return userState; 

    return this.userRoadmapRepository.create({
      userId,
      roadmapId,
      state,
    });
  }

  async removeUserState (
    roadmapId: string, 
    userId: string, 
    state: UserRoadmapState,
  ): Promise<OkResponse> {
    await this.userRoadmapRepository.delete({
      userId,
      roadmapId,
      state,
    });
    return {
      message: 'Ok',
    };
  }

  async getAllUserMaps (userId: string): Promise<RoadmapsEntity[]> {
    return this.roadmapRepository.find({
      userRoadmaps: {
        userId,
        state: In([ UserRoadmapState.FAVORITE, UserRoadmapState.OWNER, UserRoadmapState.SIGNED ]),
      },
    });
  }
}