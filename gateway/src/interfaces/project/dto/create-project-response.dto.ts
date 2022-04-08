import { ApiProperty } from '@nestjs/swagger';
import { IProject } from '../project.interface';

export class CreateProjectResponseDto {
  @ApiProperty({ example: 'project_create_success' })
  message: string;

  @ApiProperty({
    example: {
      project: {
          projectName: 'TFO tour',
          owner: 'user021',
          description: 'Cool tfo tour',
          mapBlob: 'image/png;base64;alkdjfalk...',
      },
    },
    nullable: true,
  })
  data: {
    project: IProject;
  };

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}