import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Clinic } from './clinic.schema';
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

    @Prop({ required: false })
    crmv: string;

    @Prop({ required: false })
    clinic: Clinic;
}

export const UserSchema = SchemaFactory.createForClass(User);