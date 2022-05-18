import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ClinicDocument = Clinic & Document;

@Schema()
export class Location {
    @ApiProperty()
    @Prop()
    longitude: string;
    
    @ApiProperty()
    @Prop()
    latitude: string;

    @ApiProperty()
    @Prop()
    geohash: string;
}

@Schema()
export class Clinic {
    @ApiProperty()
    @Prop()
    _id: string;
    
    @ApiProperty()
    @Prop()
    clinicName: string;

    @ApiProperty()
    @Prop()
    telephone: string;

    @ApiProperty()
    @Prop()
    mobile: string;

    @ApiProperty()
    @Prop()
    address: string;

    @ApiProperty()
    @Prop()
    city: string;

    @ApiProperty()
    @Prop()
    state: string;

    @ApiProperty()
    @Prop()
    country: string;

    @ApiProperty()
    @Prop()
    location: Location;
}

export const ClinicSchema = SchemaFactory.createForClass(Clinic);