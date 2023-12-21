import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';
import { validationOptionsMsg } from '../../utils/validation';

export class RegisterDTO {
  @ApiProperty({
    description: 'Name of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @IsString(validationOptionsMsg('Username must be string'))
    username: string; 
  
  @ApiProperty({
    description: 'Email of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Email cannot be empty'))
  @IsEmail({}, validationOptionsMsg('Email must be email'))
    email: string;
  
  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  @MinLength(8, validationOptionsMsg('Min length of password must be 8'))
  @MaxLength(32, validationOptionsMsg('Max length of password must be 32'))
  @Matches(/[a-zA-Z0-9\.\&\$*\/\\]+/, validationOptionsMsg('Password is not valid'))
    password: string;
}