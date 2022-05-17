import { Controller, Param, Get, Post, Put, Body, Logger } from '@nestjs/common';
import ClinicInterface from './interfaces/clinic.interface';
import { ClinicService } from './clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get(':id')
  async getUserByID(@Param() { id }): Promise<ClinicInterface> {
    Logger.log(`Attempting to search for user: ${id}`)
    return this.clinicService.searchClinicById(id);
  }

  @Put(':id')
  async putUpdateUser(@Param() { id }, @Body() user:ClinicInterface): Promise<ClinicInterface> {
    return this.clinicService.updateClinic(id, user);
  }
}
