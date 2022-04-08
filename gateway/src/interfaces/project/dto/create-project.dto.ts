import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @ApiProperty({
        description: `The name of the project`,
        example: 'TFO tour',
    })
    projectName: string;

    @ApiProperty({
        description: `Description of the project`,
        example: 'cool description',
    })
    description: string;

    @ApiProperty({
        description: `Main map of the project as a blob`,
        example: 'image/png;base64;alkdjfalk...',
    })
    mapBlob: string;
}
