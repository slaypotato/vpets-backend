import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import CreateUser from './interfaces/createUser.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

    async createNewUser(newUser:CreateUser): Promise<User> {
        const id = uuid();
        Logger.log(`Saving user ${id}`);
        const searched = await this.searchUserByUsername(newUser.userName)
            .then((user) => {return user._id? true : false})
            .catch((e) => {Logger.error(e); return false})
        if (!searched){
            const user = new this.UserModel({_id: id, ...newUser});
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
}
