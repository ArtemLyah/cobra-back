import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { ReviewsEntity } from '../entities/review.entity';

@Injectable()
export class ReviewRepository {
  private relations: FindOptionsRelations<ReviewsEntity> = {
    user: true,
  };

  constructor (
    @InjectRepository(ReviewsEntity)
      private repository: Repository<ReviewsEntity>,
  ) {}
  
  create (data: DeepPartial<ReviewsEntity>): Promise<ReviewsEntity> {
    const review = this.repository.create(data);
    return this.repository.save(review);
  }

  find (
    where?: FindOptionsWhere<ReviewsEntity>, 
    query?: FindManyOptions<ReviewsEntity>,
  ) {
    return this.repository.find({
      where,
      relations: this.relations,
      ...query,
    });
  }

  findOne (
    where: FindOptionsWhere<ReviewsEntity>,
    query?: FindOneOptions<ReviewsEntity>,
  ) {
    return this.repository.findOne({
      where,
      ...query,
    }).catch(() => null);
  }

  delete (where: FindOptionsWhere<ReviewsEntity>) {
    return this.repository.delete(where);
  }
}