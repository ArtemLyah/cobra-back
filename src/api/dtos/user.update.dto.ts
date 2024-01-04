import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';
import { validationOptionsMsg } from '../../utils/validation';

export class UserUpdateDTO {
  @ApiProperty({
    description: 'Name of the user',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Username must be string'))
    username?: string; 
  
  @ApiPropertyOptional({
    description: 'Link to the avatar',
  })
  @IsOptional()
  @IsUrl({}, validationOptionsMsg('Link of the avatar is not valid'))
    avatar?: string;
}