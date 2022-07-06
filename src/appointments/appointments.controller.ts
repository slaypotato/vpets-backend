import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './schemas/appointment.schema';

@ApiTags('Appointments')
@UseGuards(JwtAuthGuard)
@Controller('appointments')
@ApiExtraModels(Appointment)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiBody({type: Appointment})
  @ApiResponse({status: 201, description: 'Appointment criado com sucesso' })
  @ApiResponse({status: 400, description: 'Appointment Already Exists' })
  async postCreateAppointment(@Body() appointment: Appointment): Promise<Appointment> {
    Logger.log(`Creating appointment for Animal ${appointment.animalID} at ${appointment.date}`);
    return await this.appointmentsService.createNewAppointment(appointment);
  }

  @Get(':appointmentId')
  @ApiParam({ name: 'appointmentId', type: 'string'})
  @ApiResponse({status: 200, description: 'Appointment recuperado com sucesso' })
  @ApiResponse({status: 400, description: 'Appointment inexistente' })
  async getAppointmentByID(@Param() { appointmentId }) :Promise<Appointment> {
    Logger.log(`Attempting to search for Appointment: ${appointmentId}`);
    return await this.appointmentsService.searchAppointmentByID(appointmentId);
  }

  @Get('/owner/:ownerId')
  @ApiParam({ name: 'ownerId', type: 'string'})
  @ApiResponse({status: 200, description: 'Appointment List recuperado com sucesso' })
  @ApiResponse({status: 400, description: 'User inexistente' })
  async getAppointmentList(@Param() {ownerId}) :Promise<Appointment[]> {
    Logger.log(`Attempting to search for Appointments for user: ${ownerId}`);
    return await this.appointmentsService.searchAppointmentByOnwer(ownerId);
  }

  @Get('/doctor/:doctorId')
  @ApiParam({ name: 'ownerId', type: 'string'})
  @ApiResponse({status: 200, description: 'Appointment List recuperado com sucesso' })
  @ApiResponse({status: 400, description: 'User inexistente' })
  async getDoctorAppointmentList(@Param() {doctorId}) :Promise<Appointment[]> {
    Logger.log(`Attempting to search for Appointments for user: ${doctorId}`);
    return await this.appointmentsService.searchAppointmentByDoctor(doctorId);
  }
}
