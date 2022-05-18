import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { Clinic, ClinicDocument } from './schema/clinic.schema';
import CreateClinic from './interfaces/clinic.interface';

@Injectable()
export class ClinicService {
    constructor(@InjectModel(Clinic.name) private ClinicModel: Model<ClinicDocument>) {}

    async createNewClinic(newClinic:CreateClinic): Promise<Clinic> {
        const id = uuid();
        Logger.log(`Saving Clinic ${id}`);
        const searched = await this.searchClinicByClinicname(newClinic.clinicName)
            .then((Clinic) => {return Clinic._id? true : false})
            .catch((e) => {Logger.error(e); return false})
        if (!searched){
            const Clinic = new this.ClinicModel({_id: id, ...newClinic});
            return Clinic.save();
        } else {
            throw new BadRequestException('Clinic Already exists');
        }
    }

    async searchClinicById(ClinicId:string): Promise<Clinic> {
        return await this.ClinicModel.findById(ClinicId);
    }

    async searchClinicByClinicname(ClinicName: string): Promise<any> {
        Logger.log(`Searching Clinic by Clinic Name: ${ClinicName}`);
        return await this.ClinicModel.findOne({clinicName: {$regex: new RegExp("^" + ClinicName + "$", "i")}}).exec();
    }

    async isClinicValid(ClinicId): Promise<Boolean> {
        const found = await this.searchClinicById(ClinicId)
            .then((Clinic) => {return Clinic._id ? true : false })
            .catch((e) => {Logger.error(e); return false});
        return found
    }

    async updateClinic(_id: string, Clinic: any): Promise<Clinic> {
        Logger.log(`Updating Clinic ${_id}`);
        return await this.ClinicModel.findByIdAndUpdate(_id, Clinic);
    }
}