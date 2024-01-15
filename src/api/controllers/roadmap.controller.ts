import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiEndpoint } from '../..//decorators/ApiEndpoint';
import { RoadmapIdPipe } from '../../security/pipes/RoadmapIdPipe';
import { FullRoadmapCreateDTO } from '../dtos/fullRoadmap.create.dto';
import { RoadmapCreateDTO } from '../dtos/roadmap.create.dto';
import { RoadmapMapper } from '../mappers/roadmap.mapper';
import { FullRoadmapResponse } from '../responses/fullRoadmap.response';
import { RoadmapResponse } from '../responses/roadmaps.response';
import { RoadmapService } from '../services/roadmap.service';
import { RequestUserData } from '../types/RequestUserData.type';

@ApiTags('roadmaps')
@Controller('roadmaps')
export class RoadmapController {
  constructor (
    private roadmapService: RoadmapService,
    private roadmapMapper: RoadmapMapper,
  ) {}

  @ApiOkResponse({
    type: RoadmapResponse,
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
    InvalidBodyException:
      Title cannot be empty
      Description cannot be empty
      Difficulty cannot be empty
      Difficulty must have enum values
      Tags cannot be empty
      Tags must starts with #
    `,
  })
  @ApiEndpoint({
    summary: 'Create roadmap',
    isBearer: true,
  })
  @Post('/')
  async create (@Req() req: RequestUserData, @Body() data: RoadmapCreateDTO): Promise<RoadmapResponse> {
    const roadmap = await this.roadmapService.create(req.user.userId, data);
    return this.roadmapMapper.get(roadmap);
  }
  
  @ApiOkResponse({
    type: RoadmapResponse,
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
    InvalidBodyException:
      Title cannot be empty
      Description cannot be empty
      Difficulty cannot be empty
      Difficulty must have enum values
      Tags cannot be empty
    `,
  })
  @ApiEndpoint({
    summary: 'Create full roadmap with map structure',
    isBearer: true,
  })
  @Post('/newMap')
  async createWithMap (@Req() req: RequestUserData, @Body() data: FullRoadmapCreateDTO): Promise<RoadmapResponse> {
    const roadmap = await this.roadmapService.createWithMap(req.user.userId, data);
    return this.roadmapMapper.get(roadmap);
  }
  
  @ApiOkResponse({
    type: RoadmapResponse,
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
  @ApiParam({
    name: 'roadmapId',
    description: 'Roadmap id',
  })
  @ApiEndpoint({
    summary: 'Get roadmap by id',
    isBearer: true,
  })
  @Get('/:roadmapId')
  async get (@Param('roadmapId', RoadmapIdPipe) roadmapId: string): Promise<RoadmapResponse> {
    const roadmap = await this.roadmapService.getById(roadmapId);
    return this.roadmapMapper.get(roadmap);
  }
  
  @ApiOkResponse({
    type: [RoadmapResponse],
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
  @ApiEndpoint({
    summary: 'Get list of roadmaps',
    isBearer: true,
  })
  @Get('/')
  async getMany (): Promise<RoadmapResponse[]> {
    const roadmaps = await this.roadmapService.getMany();
    return this.roadmapMapper.getMany(roadmaps);
  }
  
  @ApiOkResponse({
    type: FullRoadmapResponse,
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
    summary: 'Get full roadmap with map structure',
    isBearer: true,
  })
  @Get('/:roadmapId/map')
  async getWithMap (@Param('roadmapId', RoadmapIdPipe) roadmapId: string): Promise<FullRoadmapResponse> {
    const roadmap = await this.roadmapService.getWithMap(roadmapId);
    return this.roadmapMapper.getWithMap(roadmap);
  }
}