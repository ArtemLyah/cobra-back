import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { validationOptionsMsg } from 'src/utils/validation';
import { RoadmapCreateDTO } from './roadmap.create.dto';

export class FullRoadmapCreateDTO extends RoadmapCreateDTO {
  @ApiProperty({
    description: 'Maps main structure',
  })
  @IsNotEmpty(validationOptionsMsg('Description cannot be empty'))
  @IsObject(validationOptionsMsg('Map structure must be an Object'))
    structure: Object;
}

