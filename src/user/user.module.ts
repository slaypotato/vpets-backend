import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service'
import { Clinic, ClinicSchema } from './schema/clinic.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Clinic.name, schema: ClinicSchema }]),
  ],
  controllers: [UserController, ClinicController],
  providers: [UserService, ClinicService],
  exports:[MongooseModule, UserService, ClinicService],
})
export class UserModule {}
