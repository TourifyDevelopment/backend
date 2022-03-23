import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocuemtn = User & Document;

@Schema()
export class User {
  /**
   * Unique username
   * @example "user01"
   */
  @Prop()
  username: string;

  /**
   * The password of the user
   * @example "kjadsfk"
   */
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);