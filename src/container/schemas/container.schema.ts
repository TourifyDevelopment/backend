import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContainerDocument = Container & Document;

@Schema()
export class Container {
    /**
     * Page_id of the page where the container is on
     * @example "ajsknkfd7sdf"
     */
    @Prop()
    pageId: string;

    /**
     * Name of the container (Attention! doesn't have to be unique) 
     * @example "logo_1"
     */
    @Prop()
    name: string;

    /**
     * x coordinate of the container
     * @example "39"
     */
    @Prop()
    xCoordinate: number;

    /**
     * y coordinate of the container
     * @example "29"
     */
    @Prop()
    yCoordinate: number;

    /**
     * width of the container
     * @example "29"
     */
    @Prop()
    width: number;

    /**
     * height of the container
     * @example "29"
     */
    @Prop()
    height: number;

    /**
     * type of content the container holds
     * Can be:
     *  - text
     *  - image
     *  - video
     *  - audio
     * @example "text"
     */
    @Prop()
    type: string;

    /**
     * Id of the resource the container contains
     * @example "aisjdf8sud"
     */
    @Prop()
    resourceId: string;
}

export const ContainerSchema = SchemaFactory.createForClass(Container);