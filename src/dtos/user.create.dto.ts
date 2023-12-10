import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, MaxLength, Matches, IsUrl } from 'class-validator';
import { validationOptionsMsg } from '../utils/validation';

export class UserCreateDTO {
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @IsString(validationOptionsMsg('Username must be string'))
    username: string; 
  
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @IsEmail({}, validationOptionsMsg('Username must be email'))
    email: string;
  
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  @MinLength(8, validationOptionsMsg('Min length of password must be 8'))
  @MaxLength(32, validationOptionsMsg('Max length of password must be 32'))
  @Matches(/[a-zA-Z0-9\.\&\$*\/\\]+/, validationOptionsMsg('Password is not valid'))
    password: string;
  
  @IsOptional()
  @IsUrl({}, validationOptionsMsg('Link of the avatar is not valid'))
    avatar?: string;
}