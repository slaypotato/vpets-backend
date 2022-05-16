import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: string;
    
    @Prop()
    userName: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string;

    @Prop()
    firstName: string;

    @Prop()
    middleName: string;

    @Prop()
    lastName: string;

    @Prop()
    aboutMe: string;

    @Prop()
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);