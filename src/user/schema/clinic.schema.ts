import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClinicDocument = Clinic & Document;

@Schema()
export class Location {
    @Prop()
    longitude: string;
    
    @Prop()
    latitude: string;

    @Prop()
    geohash: string;
}

@Schema()
export class Clinic {
    @Prop()
    _id: string;
    
    @Prop()
    clinicName: string;

    @Prop()
    telephone: string;

    @Prop()
    mobile: string;

    @Prop()
    address: string;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    country: string;

    @Prop()
    location: Location;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);