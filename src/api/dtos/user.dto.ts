import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { validationOptionsMsg } from '../../utils/validation';

export class UserDTO {
  @ApiPropertyOptional({
    description: 'User\'s id',
  })
  @IsOptional()
  @IsUUID()
    id?: string;
  
  @ApiPropertyOptional({
    description: 'Name of the user',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Username must be string'))
    username?: string; 

  @ApiPropertyOptional({
    description: 'User\'s email',
  })
  @IsOptional()
  @IsEmail({}, validationOptionsMsg('Email must be in email format'))
    email?: string;
  
  @ApiPropertyOptional({
    description: 'User\'s password hash',
  })
  @IsOptional()
    passwordHash?: string;
}