import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiEndpoint } from '../../decorators/ApiEndpoint';
import { RoadmapIdPipe } from '../../security/pipes/RoadmapIdPipe';
import { ReviewCreateDTO } from '../dtos/review.create.dto';
import { ReviewResponse } from '../responses/reviews.response';
import { ReviewService } from '../services/reviews.service';
import { RequestUserData } from '../types/RequestUserData.type';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor (
    private reviewService: ReviewService,
  ) {}
  
  @ApiOkResponse({
    type: ReviewResponse,
  })
  @ApiUnauthorizedResponse({
    description: `
    UnauthorizedException:
      Unauthorized
      Invalid token
      User is unauthorized
    `,
  })
  @ApiForbiddenResponse({
    description: `
    ForbiddenException:
      User is unauthorized
      Cannot assign state as owner of the roadmap
    `,
  })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      Roadmap with such id is not found
    
    BadRequestException:
      Validation failed (enum string is expected)

    InvalidBodyException:
      Rate cannot be empty
      Rate must be number
      Rate must be greater than 0
      Rate must be fewer than 5
    `,
  })
  @ApiEndpoint({
    summary: 'Create a review for the roadmap',
    isBearer: true,
  })
  @Post('/:roadmapId')
  create (
    @Req() req: RequestUserData,
    @Param('roadmapId', RoadmapIdPipe) roadmapId: string,
    @Body() data: ReviewCreateDTO,
  ): Promise<ReviewResponse> {
    return this.reviewService.create(req.user.userId, roadmapId, data);
  }

  @ApiOkResponse({
    type: [ReviewResponse],
  })
  @ApiUnauthorizedResponse({
    description: `
    UnauthorizedException:
      Unauthorized
      Invalid token
      User is unauthorized
    `,
  })
  @ApiForbiddenResponse({
    description: `
    ForbiddenException:
      User is unauthorized
    `,
  })
  @ApiBadRequestResponse({
    description: `
    InvalidEntityIdException:
      Roadmap with such id is not found
    `,
  })
  @ApiEndpoint({
    summary: 'Create a review for the roadmap',
    isBearer: true,
  })
  @ApiEndpoint({
    summary: 'Get all reviews of the roadmap',
    isBearer: true,
  })
  @Get('/:roadmapId')
  get (@Param('roadmapId', RoadmapIdPipe) roadmapId: string): Promise<ReviewResponse[]> {
    return this.reviewService.getRoadmapReviews(roadmapId);
  }
}