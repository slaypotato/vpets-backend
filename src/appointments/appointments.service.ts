import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
    constructor(@InjectModel(Appointment.name) private AppointmentModel: Model<AppointmentDocument>) {}

    async createNewAppointment(newAppointment: Appointment): Promise<Appointment> {
        const id = uuid();

        Logger.log(`Saving user ${id}`);
        const searched = await this.searchAppointmentByOnwer(newAppointment.ownerID)
            .then((appointment) => {return appointment})
            .catch((e) => {Logger.error(e); return []})
        if (searched.length <= 0) {     
            console.log(searched);
            const appointment = new this.AppointmentModel({_id: id, ...newAppointment});
            return appointment.save();
        } else if (this.containAppointment(newAppointment, searched)) {
            throw new BadRequestException('Appointment Already exists');
        } else {
            throw new BadRequestException('Invalid Appointment');
        }
    }

    containAppointment(appointment: Appointment, appointmentList: Appointment[]): boolean {
        const resp = appointmentList.filter((item) => {
            item == appointment
        });
        return resp.length > -1 ? true : false;
    }

    async searchAppointmentByOnwer(ownerID): Promise<Appointment[]> {
        Logger.log(`Searching user by OwnerID: ${ownerID}`);
        return await this.AppointmentModel.find({ownerID:{$regex: new RegExp("^" + ownerID + "$", "i")}}).exec();
    }

    async searchAppointmentByDoctor(doctorID): Promise<Appointment[]> {
        Logger.log(`Searching user by OwnerID: ${doctorID}`);
        return await this.AppointmentModel.find({doctorID:{$regex: new RegExp("^" + doctorID + "$", "i")}}).exec();
    }

    async searchAppointmentByID(apopointmentID): Promise<Appointment> {
        Logger.log(`Searching user by OwnerID: ${apopointmentID}`);
        return await this.AppointmentModel.findOne({_id:{$regex: new RegExp("^" + apopointmentID + "$", "i")}}).exec();
    }
}
