import createUserInterface from "./createUser.interface";
import { ApiProperty } from '@nestjs/swagger';

export default interface UserInterface extends createUserInterface {
    _id: string;
    __v0?: number;
}