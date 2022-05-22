import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type AnimalDocument = Animal & Document;

@Schema()
export class Animal {
    @ApiProperty()
    @Prop()
    _id: string;
    
    @ApiProperty()
    @Prop()
    animalName: string;

    @ApiProperty()
    @Prop()
    type: string;

    @ApiProperty()
    @Prop()
    genre: string;

    @ApiProperty({ required: false })
    @Prop({ required: false })
    animalPicture: string;

    @ApiProperty()
    @Prop()
    birtday: string;

    @ApiProperty()
    @Prop()
    weight: number;

}

export const AnimalSchema = SchemaFactory.createForClass(Animal);