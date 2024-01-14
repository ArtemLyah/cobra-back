import { ApiProperty } from '@nestjs/swagger';

export class TagsResponse {
  @ApiProperty({
    description: 'Tag id',
  })
    id: string;
  
  @ApiProperty({
    description: 'Tag name',
  })
    name: string;
}