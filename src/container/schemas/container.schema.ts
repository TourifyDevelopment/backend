import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ContainerDocument = Container & Document;

@Schema()
export class Container {
    @ApiProperty({
        description: `Page_id of the page where the container is on`,
        example: 'hakdfjalsfj',
    })
    @Prop({required: true})
    pageId: string;

    @ApiProperty({
        description: `Name of the container (Attention! doesn't have to be unique)`,
        example: 'logo_1'
    })
    @Prop({required: true})
    name: string;

    @ApiProperty({
        description: `x coordinate of the container`,
        example: '39'
    })
    @Prop()
    xCoordinate: number;

    @ApiProperty({
        description: `y coordinate of the container`,
        example: '40'
    })
    @Prop()
    yCoordinate: number;

    @ApiProperty({
        description: `width of the container`,
        example: '29'
    })
    @Prop()
    width: number;

    @ApiProperty({
        description: `height of the container`,
        example: '29'
    })
    @Prop()
    height: number;

    @ApiProperty({
        description: `Id of the resource the container contains`,
        example: 'alsdjflka7sf'
    })
    @Prop({required: true})
    resourceId: string;
}

export const ContainerSchema = SchemaFactory.createForClass(Container);