import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, MaxLength, Matches, IsUrl } from 'class-validator';
import { validationOptionsMsg } from '../utils/validation';

export class UserCreateDTO {
  @ApiProperty({
    description: 'Name of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @IsString(validationOptionsMsg('Username must be string'))
    username: string; 
  
  @ApiProperty({
    description: 'Email of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @IsEmail({}, validationOptionsMsg('Username must be email'))
    email: string;
  
  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  @MinLength(8, validationOptionsMsg('Min length of password must be 8'))
  @MaxLength(32, validationOptionsMsg('Max length of password must be 32'))
  @Matches(/[a-zA-Z0-9\.\&\$*\/\\]+/, validationOptionsMsg('Password is not valid'))
    password: string;
  
  @ApiPropertyOptional({
    description: 'Users avatar link',
  })
  @IsOptional()
  @IsUrl({}, validationOptionsMsg('Link of the avatar is not valid'))
    avatar?: string;
}