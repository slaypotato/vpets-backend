import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { ClinicService } from './clinic.service';

@Injectable()
export class UserService {
    constructor
    (
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        private readonly clinicService: ClinicService,
    ) {}

    async createNewUser(newUser:User): Promise<User> {
        const id = uuid();
        let user;

        Logger.log(`Saving user ${id}`);
        const searched = await this.searchUserByUsername(newUser.userName)
            .then((user) => {return user._id? true : false})
            .catch((e) => {Logger.error(e); return false})
        if (!searched){     
            if (newUser.crmv){
                const clinic = await this.checkClinic(newUser);
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
        return await this.UserModel.findOne({userName:{$regex: new RegExp("^" + userName + "$", "i")}}).exec();
    }

    async isUserValid(userId): Promise<Boolean> {
        const found = await this.searchUserById(userId)
            .then((user) => {return user._id ? true : false })
            .catch((e) => {Logger.error(e); return false});
        return found
    }

    async updateUser(_id: string, user: User): Promise<User> {
        Logger.log(`Updating user ${_id}`);
        if (user.crmv) {
            const clinic = await this.checkClinic(user);
            console.log(user.clinic);
            console.log(clinic);
            return await this.UserModel.findByIdAndUpdate(_id, {...user,  clinic: clinic});
        } else {
            return await this.UserModel.findByIdAndUpdate(_id, user);
        }
    }

    async checkClinic({crmv, clinic}: User): Promise<any> {
        if (!crmv){
            throw new BadRequestException('Veterinarian needs to add CRMV number');
        }
        const searched = await this.clinicService.searchClinicByClinicname(clinic.clinicName);
        if (searched){
            return searched;
        } else {
            const newClinic = await this.clinicService.createNewClinic(clinic);
            return newClinic;
        }
    }
}
