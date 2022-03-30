import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ResourceDocument = Resource & Document;

export enum ResourceType {
    Text = 'Text',
    Image = 'Image',
    Video = 'Video',
    Audio = 'Audio',
}

@Schema()
export class Resource {
    @ApiProperty({
        description: `The type of the resource`,
        example: 'text',
        enum: ResourceType,
    })
    @Prop({
        type: String,
        required: true,
        enum: ResourceType,
    })
    type: ResourceType;

    @ApiProperty({
        description: `Blob of the resource`,
        example: 'image/png;base64;alkdjfalk...'
    })
    @Prop({ required: true })
    blob: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);