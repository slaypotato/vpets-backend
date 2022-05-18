import ClinicInterface from "./clinic.interface";


export default interface createUserInterface {
    userName: string;
    password: string;
    avatar: string;
    firstName: string;
    middleName:string;
    lastName: string;
    aboutMe: string;
    role: string;
    crmv?: string;
    clinic?:ClinicInterface
}