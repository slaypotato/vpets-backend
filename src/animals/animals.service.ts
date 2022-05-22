import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';
import { UserService } from '../user/user.service';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AnimalsService {
    constructor(
        @InjectModel(Animal.name) private AnimalModel: Model<AnimalDocument>,
        private readonly userService:UserService,
    ) {}

    async createNewAnimal(newAnimal:Animal): Promise<Animal> {
        const id = uuid();
        Logger.log(`Saving Animal ${id}`);
        const searched = await this.searchAnimalByName(newAnimal.animalName)
            .then((animal) => {return animal._id? true : false})
            .catch((e) => {Logger.error(e); return false})
        if (!searched){
            const animal = new this.AnimalModel({_id: id, ...newAnimal});
            animal.save();
            this.addAnimaltoUser(animal);
            return animal
        } else {
            throw new BadRequestException('Animal Already exists');
        }
    }

    async searchAnimalById(animalId:string): Promise<Animal> {
        return await this.AnimalModel.findById(animalId);
    }

    async searchAnimalByName(animalName: string): Promise<any> {
        Logger.log(`Searching Animal by Name: ${animalName}`);
        return await this.AnimalModel.findOne({animalName: {$regex: new RegExp("^" + animalName + "$", "i")}}).exec();
    }

    async isAnimalValid(animalId: string): Promise<Boolean> {
        const found = await this.searchAnimalById(animalId)
            .then((Animal) => {return Animal._id ? true : false })
            .catch((e) => {Logger.error(e); return false});
        return found
    }

    async updateAnimal(_id: string, animal: Animal): Promise<Animal> {
        Logger.log(`Updating Animal ${_id}`);
        return await this.AnimalModel.findByIdAndUpdate(_id, animal);
    }

    async addAnimaltoUser(animal: Animal): Promise<User> {
        const user = await this.userService.searchUserById(animal.ownerID);
        user.animals.push(animal);
        Logger.log(`Adding animal ${animal._id} to user ${user._id}`);
        return this.userService.updateUser(user._id, user);
    }
}
