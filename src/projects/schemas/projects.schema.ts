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
    @Prop()
    projectName: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);