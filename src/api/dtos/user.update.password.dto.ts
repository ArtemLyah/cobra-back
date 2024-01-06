import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/validation';

export class UserUpdatePasswordDTO {
  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
    oldPassword: string;
  
  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  @MinLength(8, validationOptionsMsg('Min length of password must be 8'))
  @MaxLength(32, validationOptionsMsg('Max length of password must be 32'))
  @Matches(/[a-zA-Z0-9\.\&\$*\/\\]+/, validationOptionsMsg('Password is not valid'))
    newPassword: string;
}