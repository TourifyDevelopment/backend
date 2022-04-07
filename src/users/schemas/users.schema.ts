import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @ApiProperty({
        description: `Unique username`,
        example: 'user01',
    })
    @Prop({ unique: true, required: true })
  username: string;

    @ApiProperty({
        description: `The password of the user`,
        example: 'aslkdjf',
    })
    @Prop({ required: true })
  password: string;

    @ApiProperty({
        description: `The user profile picture`,
        example: '9230932',
    })
    @Prop()
  profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
