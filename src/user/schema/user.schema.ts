import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Clinic } from './clinic.schema';
import { Animal } from '../../animals/schemas/animal.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @ApiProperty()
    @Prop()
    _id: string;
    
    @ApiProperty()
    @Prop()
    userName: string;

    @ApiProperty()
    @Prop()
    password: string;

    @ApiProperty()
    @Prop()
    avatar: string;

    @ApiProperty()
    @Prop()
    firstName: string;

    @ApiProperty()
    @Prop()
    middleName: string;

    @ApiProperty()
    @Prop()
    lastName: string;

    @ApiProperty()
    @Prop()
    aboutMe: string;

    @ApiProperty()
    @Prop()
    role: string;

    @ApiProperty()
    @Prop({ required: false })
    crmv?: string;

    @ApiProperty()
    @Prop({ required: false })
    clinic?: Clinic;

    @ApiProperty({type:Animal, isArray:true})
    @Prop({ default:[], required:false })
    animals?: [Animal];
}

export const UserSchema = SchemaFactory.createForClass(User);