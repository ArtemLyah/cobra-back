import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../../utils/validation';

export class LoginDTO {
  @ApiProperty({
    description: 'User\'s email',
  })
  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
  @IsEmail({}, validationOptionsMsg('Email must be in email format'))
    email: string;
  
  @ApiProperty({
    description: 'User\'s password',
  })
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
    password: string;
}