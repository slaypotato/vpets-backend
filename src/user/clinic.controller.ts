import { Controller, Param, Get, Post, Put, Body, Logger } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import ClinicInterface from './interfaces/clinic.interface';
import { ClinicService } from './clinic.service';
import { Clinic } from './schema/clinic.schema';

@ApiTags('Clinic')
@Controller('clinic')
@ApiExtraModels(Clinic)
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get(':id')
  @ApiParam({ name:'id', type:'string' })
  @ApiResponse({status:200, description: 'Clinica recuperado com sucesso'})
  @ApiResponse({status:400, description: 'Clinica inexistente com sucesso'})
  async getUserByID(@Param() { id }): Promise<ClinicInterface> {
    Logger.log(`Attempting to search for user: ${id}`)
    return this.clinicService.searchClinicById(id);
  }

  @Put(':id')
  @ApiParam({ name:'id', type:'string' })
  @ApiBody({ type:Clinic })
  @ApiResponse({status:200, description: 'Clinica recuperado com sucesso'})
  @ApiResponse({status:400, description: 'Clinica inexistente com sucesso'})
  async putUpdateUser(@Param() { id }, @Body() user:ClinicInterface): Promise<ClinicInterface> {
    return this.clinicService.updateClinic(id, user);
  }
}
