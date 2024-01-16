import { Injectable } from '@nestjs/common';
import { ReviewRepository } from '../../databases/repositories/review.repository';
import { ReviewCreateDTO } from '../dtos/review.create.dto';

@Injectable()
export class ReviewService {
  constructor (
    private reviewRepository: ReviewRepository,
  ) {}
  
  create (userId: string, roadmapId: string, { rate, comment }: ReviewCreateDTO) {
    return this.reviewRepository.create({
      userId,
      roadmapId,
      rate,
      text: comment,
    });
  }

  getRoadmapReviews (roadmapId: string) {
    return this.reviewRepository.find({
      roadmapId,
    });
  }
}