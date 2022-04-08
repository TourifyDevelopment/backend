import { ApiProperty } from '@nestjs/swagger';
import { IProject } from '../project.interface';

export class GetAllProjectsDto {
  @ApiProperty({ 
    example: 'project_get_all_success',
  })
  message: string;

  @ApiProperty({
    example: {
      projects: [
        {
          projectName: 'TFO tour',
          owner: 'user021',
          description: 'Cool tfo tour',
          mapBlob: 'image/png;base64;alkdjfalk...',
        },
      ],
    },
    nullable: true,
  })
  data: {
    projects: IProject[];
  };

  @ApiProperty({ example: 'null' })
  errors: { [key: string]: any };
}
