import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PageDocument = Page & Document;

@Schema()
export class Page {
    @ApiProperty({
        description: `Project id of the project this page is part of`,
        example: 'kfjasdf',
    })
    @Prop({ required: true })
    projectId: string;

    @ApiProperty({
        description: `Name of the page, is unique`,
        example: 'sn_labor',
    })
    @Prop({ unique: true, required: true })
    name: string;

    @ApiProperty({
        description: `Display name of the page`,
        example: 'SN Labor',
    })
    @Prop()
    displayName: string;

    @ApiProperty({
        description: `Map x coordinate of the page`,
        example: '50',
    })
    @Prop()
    mapX: number;

    @ApiProperty({
        description: `Map y coordinate of the page`,
        example: '30',
    })
    @Prop()
    mapY: number;
}

export const PageSchema = SchemaFactory.createForClass(Page);
