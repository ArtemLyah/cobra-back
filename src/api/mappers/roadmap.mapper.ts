import { ReviewsEntity } from 'src/databases/entities/review.entity';
import { RoadmapsEntity } from 'src/databases/entities/roadmaps.entity';
import { UserRoadmapsEntity } from 'src/databases/entities/userRoadmaps.entity';
import { AllUserMapsResponse } from '../responses/allUserMaps.response';
import { FullRoadmapResponse } from '../responses/fullRoadmap.response';
import { RoadmapResponse, RoadmapShortResponse } from '../responses/roadmaps.response';
import { UserStateResponse } from '../responses/userState.response';
import { FullRoadmap } from '../types/RoadmapWithMap.type';
import { UserRoadmapState } from '../types/userRoadmapState.type';

export class RoadmapMapper {
  create (roadmap: RoadmapsEntity): RoadmapResponse {
    console.log(roadmap);
    return {
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description,
      difficulty: roadmap.difficulty,
      rating: 0,
      reviewsAmount: 0,
      created_at: roadmap.created_at,
      tags: roadmap.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
      reviews: [],
      userStates: [UserRoadmapState.OWNER],
    };
  }

  get (userId: string, roadmap: RoadmapsEntity): RoadmapResponse {
    const userStates = roadmap.userRoadmaps
      .filter((userRoadmap) => userRoadmap.userId === userId)
      .map((userState) => userState.state);

    return {
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description,
      difficulty: roadmap.difficulty,
      rating: this.calculateRating(roadmap.reviews),
      reviewsAmount: roadmap.userRoadmaps?.length,
      created_at: roadmap.created_at,
      tags: roadmap.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
      reviews: roadmap.reviews.map(review => ({
        rate: review.rate,
        userId: review.userId,
        roadmapId: review.roadmapId,
        text: review.text,
        user: {
          id: review?.user.id,
          username: review?.user.username,
          avatar: review?.user.avatar,
        },
      })),
      userStates,
    };
  }

  getShort (userId: string, roadmap: RoadmapsEntity): RoadmapShortResponse {
    const userStates = roadmap.userRoadmaps
      .filter((userRoadmap) => userRoadmap.userId === userId)
      .map((userState) => userState.state);

    return {
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description,
      difficulty: roadmap.difficulty,
      rating: this.calculateRating(roadmap.reviews),
      reviewsAmount: roadmap.userRoadmaps?.length,
      created_at: roadmap.created_at,
      tags: roadmap.tags,
      userStates,
    };
  }
  
  getMany (userId: string, roadmaps: RoadmapsEntity[]): RoadmapShortResponse[] {
    return roadmaps.map((roadmap) => this.getShort(userId, roadmap));
  }

  getWithMap (userId: string, {
    roadmap,
    map,
  }: FullRoadmap): FullRoadmapResponse {
    return {
      ...this.get(userId, roadmap),
      owner: {
        id: roadmap.owner.id,
        username: roadmap.owner.username,
        avatar: roadmap.owner.avatar,
      },
      map: JSON.parse(map.structure),
    };
  }

  getAllUserMaps (userId: string, roadmaps: RoadmapsEntity[]): AllUserMapsResponse {
    const result = {
      favorite: [],
      owned: [],
      signed: [],
    };

    for (const roadmap of roadmaps) {
      if (roadmap.userRoadmaps.find(
        (userRoadmap) => userRoadmap.state === UserRoadmapState.FAVORITE,
      )) result.favorite.push(this.getShort(userId, roadmap));
      
      if (roadmap.userRoadmaps.find(
        (userRoadmap) => userRoadmap.state === UserRoadmapState.OWNER,
      )) result.owned.push(this.getShort(userId, roadmap));
      
      if (roadmap.userRoadmaps.find(
        (userRoadmap) => userRoadmap.state === UserRoadmapState.SIGNED,
      )) result.signed.push(this.getShort(userId, roadmap));
    }

    return result;
  }

  setUserState ({ roadmapId, userId, state }: UserRoadmapsEntity): UserStateResponse {
    return {
      roadmapId,
      userId,
      state,
    };
  }

  calculateRating (reviews: ReviewsEntity[]): number {
    let rating = 0;
    if (reviews?.length) {
      rating = reviews?.reduce((total, review) => ({
        ...total,
        rate: total.rate+review.rate,
      })).rate / reviews.length;
    }
    return rating;
  }
}