import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema()
export class Page {
    /**
     * Project id of the project this page is part of
     * @example "923u54on"
     */
    @Prop()
    projectId: string;

    /**
     * Name of the page, is unique
     * @example "sn_labor"
     */
    @Prop({unique: true})
    name: string;

    /**
     * Display name of the page
     * @example "Sn Labor"
     */
    @Prop()
    displayName: string;

    /**
     * Map x coodinate of the page
     * @example "50"
     */
    @Prop()
    mapX: number;

    /**
     * Map y coodinate of the page
     * @example "30"
     */
    @Prop()
    mapY: number;
}

export const PageSchema = SchemaFactory.createForClass(Page);