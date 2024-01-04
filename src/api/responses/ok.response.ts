import { ApiProperty } from '@nestjs/swagger';

export class OkResponse {
  @ApiProperty({
    description: 'Ok message',
  })
    message: string;
}