import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
    @ApiProperty()
    @Prop()
    _id: string;
    
    @ApiProperty()
    @Prop()
    ownerID: string;

    @ApiProperty({ isArray: true })
    @Prop({ default:[], isArray: true })
    animalID: [string];

    @ApiProperty({ required: false })
    @Prop({ required: false })
    doctorID?: string;

    @ApiProperty()
    @Prop()
    date: string;

    @ApiProperty()
    @Prop()
    title: string;

    @ApiProperty()
    @Prop()
    description: string;

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);