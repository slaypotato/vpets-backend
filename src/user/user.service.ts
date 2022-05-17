import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import CreateUser from './interfaces/createUser.interface';
import { ClinicService } from './clinic.service';

@Injectable()
export class UserService {
    constructor
    (
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        private readonly clinicService: ClinicService,
    ) {}

    async createNewUser(newUser:CreateUser): Promise<User> {
        const id = uuid();
        let user;

        Logger.log(`Saving user ${id}`);
        const searched = await this.searchUserByUsername(newUser.userName)
            .then((user) => {return user._id? true : false})
            .catch((e) => {Logger.error(e); return false})
        if (!searched){
            const clinic = this.checkClinic(newUser);
            if (newUser.crmv){
                user = new this.UserModel({_id: id, ...newUser, clinic: clinic}); 
            } else {
                user = new this.UserModel({_id: id, ...newUser});
            }
            return user.save();
        } else {
            throw new BadRequestException('User Already exists');
        }
    }

    async searchUserById(userId:string): Promise<User> {
        return await this.UserModel.findById(userId);
    }

    async searchUserByUsername(userName: string): Promise<any> {
        Logger.log(`Searching user by username: ${userName}`);
        return await this.UserModel.findOne({userName}).exec();
    }

    async isUserValid(userId): Promise<Boolean> {
        const found = await this.searchUserById(userId)
            .then((user) => {return user._id ? true : false })
            .catch((e) => {Logger.error(e); return false});
        return found
    }

    async updateUser(_id: string, user: any): Promise<User> {
        Logger.log(`Updating user ${_id}`);
        return await this.UserModel.findByIdAndUpdate(_id, user);
    }

    async checkClinic({crmv, clinic}: CreateUser): Promise<any> {
        if (!crmv){
            throw new BadRequestException('Veterinarian needs to add CRMV number');
        }
        const searched = this.clinicService.searchClinicByClinicname(clinic.clinicName);
        if (searched){
            return searched;
        } else {
            const newClinic = this.clinicService.createNewClinic(clinic);
            return newClinic;
        }
    }
}
