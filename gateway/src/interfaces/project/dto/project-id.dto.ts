import { ApiProperty } from '@nestjs/swagger';

export class ProjectIdDto {
  @ApiProperty()
  id: string;
}