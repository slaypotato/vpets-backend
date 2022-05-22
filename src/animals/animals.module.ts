import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from './schemas/animal.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
    UserModule
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService]
})
export class AnimalsModule {}
