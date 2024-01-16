import { Body, Controller, Delete, Get, Param, ParseEnumPipe, Post, Query, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RoadmapFilterByPipe } from 'src/security/pipes/RoadmapFilterByPipe';
import { ApiEndpoint } from '../..//decorators/ApiEndpoint';
import { RoadmapIdPipe } from '../../security/pipes/RoadmapIdPipe';
import { FullRoadmapCreateDTO } from '../dtos/fullRoadmap.create.dto';
import { RoadmapCreateDTO } from '../dtos/roadmap.create.dto';
import { RoadmapMapper } from '../mappers/roadmap.mapper';
import { AllUserMapsResponse } from '../responses/allUserMaps.response';
import { FullRoadmapResponse } from '../responses/fullRoadmap.response';
import { RoadmapResponse, RoadmapShortResponse } from '../responses/roadmaps.response';
import { UserStateResponse } from '../responses/userState.response';
import { RoadmapService } from '../services/roadmap.service';
import { RequestUserData } from '../types/RequestUserData.type';
import { RoadmapFilterByDTO } from '../dtos/roadmapFilterBy.dto';
import { RoadmapDifficultyEnum } from '../types/RoadmapDifficulty.type';
import { UserRoadmapState } from '../types/userRoadmapState.type';
import { OkResponse } from '../responses/ok.response';

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
    `,
  })
  @ApiEndpoint({
    summary: 'Create roadmap',
    isBearer: true,
  })
  @Post('/')
  async create (@Req() req: RequestUserData, @Body() data: RoadmapCreateDTO): Promise<RoadmapResponse> {
    const roadmap = await this.roadmapService.create(req.user.userId, data);
    return this.roadmapMapper.create(roadmap);
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
    return this.roadmapMapper.create(roadmap);
  }
  
  @ApiOkResponse({
    type: AllUserMapsResponse,
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
    summary: 'Return all maps related with user',
    isBearer: true,
  })
  @Get('/myMaps')
  async getAllUserMaps (@Req() req: RequestUserData) {
    const roadmaps = await this.roadmapService.getAllUserMaps(req.user.userId);
    return this.roadmapMapper.getAllUserMaps(req.user.userId, roadmaps);
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
  async get (
    @Req() req: RequestUserData,
    @Param('roadmapId', RoadmapIdPipe) roadmapId: string,
  ): Promise<RoadmapResponse> {
    const roadmap = await this.roadmapService.getById(roadmapId);
    return this.roadmapMapper.get(req.user.userId, roadmap);
  }
  
  @ApiOkResponse({
    type: [RoadmapShortResponse],
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
  @ApiQuery({
    name: 'name',
    required: false,
  })
  @ApiQuery({
    name: 'rating',
    required: false,
  })
  @ApiQuery({
    name: 'difficulty',
    enum: RoadmapDifficultyEnum,
    required: false,
  })
  @ApiEndpoint({
    summary: 'Get list of roadmaps',
    isBearer: true,
  })
  @Get('/')
  async getMany (
    @Req() req: RequestUserData,
    @Query(RoadmapFilterByPipe) filterBy?: RoadmapFilterByDTO,
  ) {
    const roadmaps = await this.roadmapService.getMany(filterBy);
    return this.roadmapMapper.getMany(req.user.userId, roadmaps);
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
  async getWithMap (
    @Req() req: RequestUserData,
    @Param('roadmapId', RoadmapIdPipe) roadmapId: string,
  ): Promise<FullRoadmapResponse> {
    const roadmap = await this.roadmapService.getWithMap(roadmapId);
    return this.roadmapMapper.getWithMap(req.user.userId, roadmap);
  }

  @ApiOkResponse({
    type: UserStateResponse,
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
    `,
  })
  @ApiQuery({
    name: 'state',
    enum: UserRoadmapState,
  })
  @ApiEndpoint({
    summary: 'Get full roadmap with map structure',
    isBearer: true,
  })
  @Post('/:roadmapId/setState')
  async setUserState (
    @Req() req: RequestUserData,
    @Param('roadmapId', RoadmapIdPipe) roadmapId: string,
    @Query('state', new ParseEnumPipe(UserRoadmapState)) state: UserRoadmapState, 
  ): Promise<UserStateResponse> {
    console.log(req.user);
    const userState = await this.roadmapService.setUserState(roadmapId, req.user.userId, state);
    return this.roadmapMapper.setUserState(userState);
  }
  
  @ApiOkResponse({
    type: UserStateResponse,
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
    `,
  })
  @ApiEndpoint({
    summary: 'Get full roadmap with map structure',
    isBearer: true,
  })
  @ApiQuery({
    name: 'state',
    enum: UserRoadmapState,
  })
  @Delete('/:roadmapId/removeState')
  async removeUserState (
    @Req() req: RequestUserData,
    @Param('roadmapId', RoadmapIdPipe) roadmapId: string,
    @Query('state', new ParseEnumPipe(UserRoadmapState)) state: UserRoadmapState, 
  ): Promise<OkResponse> {
    return this.roadmapService.removeUserState(roadmapId, req.user.userId, state);
  }
}