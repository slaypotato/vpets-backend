import { Controller, Param, Get, Post, Put, Body, Logger } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { Animal } from './schemas/animal.schema';

@ApiTags('Animals')
@Controller('animals')
@ApiExtraModels(Animal)
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string'})
  @ApiResponse({status: 200, description: 'Animal recuperado com sucesso' })
  @ApiResponse({status: 400, description: 'Animal inexistente' })
  async getUserByID(@Param() {id}) :Promise<Animal> {
    Logger.log(`Attempting to search for animal: ${id}`);
    return await this.animalsService.searchAnimalById(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: 'string'})
  @ApiBody({type: Animal})
  @ApiResponse({status: 201, description: 'Animal atualizado com sucesso' })
  async putUpdateAnimal(@Param() { id }, @Body() animal: Animal): Promise<Animal> {
    Logger.log(`Updating animal: ${id}`);
    return await this.animalsService.updateAnimal(id, animal);
  }

  @Post()
  @ApiBody({type: Animal})
  @ApiResponse({status: 201, description: 'Animal criado com sucesso' })
  @ApiResponse({status: 400, description: 'Animal Already Exists' })
  async postCreateAnimal(@Body() animal: Animal): Promise<Animal> {
    Logger.log(`Creating new Animal ${animal.animalName}`);
    return await this.animalsService.createNewAnimal(animal);
  }
    
}
