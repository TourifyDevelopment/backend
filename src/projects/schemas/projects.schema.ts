import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
    @ApiProperty({
        description: `The name of the project`,
        example: 'TFO tour'
    })
    @Prop({required: true})
    projectName: string;

    @ApiProperty({
        description: `The owner of the project(username)`,
        example: 'user01'
    })
    @Prop({required: true})
    owner: string;

    @ApiProperty({
        description: `Description of the project`,
        example: 'cool description'
    })
    @Prop()
    description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);