import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocuemtn = User & Document;

@Schema()
export class User {
    /**
     * Unique username
     * @example "user01"
     */
    @Prop({ unique: true })
    username: string;

    /**
     * The password of the user
     * @example "kjadsfk"
     */
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);