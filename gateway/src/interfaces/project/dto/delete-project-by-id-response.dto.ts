import { ApiProperty } from '@nestjs/swagger';

export class DeleteProjectByIdResponseDto {
    @ApiProperty({
        example: 'project_delete_by_id_success',
    })
    message: string;

    @ApiProperty({ example: null, nullable: true, type: 'null' })
    data: null;

    @ApiProperty({ example: 'null' })
    errors: { [key: string]: any };
}
