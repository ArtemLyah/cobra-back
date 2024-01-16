import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { validationOptionsMsg } from 'src/utils/validation';

export class ReviewCreateDTO {
  @ApiProperty({
    description: 'Rate for the roadmap',
  })
  @IsNotEmpty(validationOptionsMsg('Rate cannot be empty'))
  @IsNumber(undefined, validationOptionsMsg('Rate must be number'))
  @Min(0, validationOptionsMsg('Rate must be greater than 0'))
  @Max(5, validationOptionsMsg('Rate must be fewer than 5'))
    rate: number;
  
  @ApiProperty({
    description: 'Comment for the roadmap',
  })
  @IsNotEmpty(validationOptionsMsg('Comment cannot be empty'))
    comment: string;
}