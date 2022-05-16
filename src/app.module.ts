import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AnimalsModule } from './animals/animals.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { LOCAL_VAR_SCHEMA } from './lib/variables.validator';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({validationSchema: LOCAL_VAR_SCHEMA}), 
    AnimalsModule, 
    AppointmentsModule, 
    ProductsModule, 
    DatabaseModule, 
    AuthModule, 
    UserModule,
  ],
})
export class AppModule {}
