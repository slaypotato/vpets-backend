import { Controller, Param, Get, Post, Put, Body, Logger } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import CreateUser from './interfaces/createUser.interface';
import UserInterface from './interfaces/user.interface';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
@ApiExtraModels(User)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiParam({ name:'id', type:'string' })
  @ApiResponse({status:200, description: 'Usuário recuperado com sucesso'})
  @ApiResponse({status:400, description: 'Usuário inexistente'})
  async getUserByID(@Param() { id }): Promise<User> {
    Logger.log(`Attempting to search for user: ${id}`)
    return this.userService.searchUserById(id);
  }

  @Post()
  @ApiBody({ type:User })
  @ApiResponse({status:201, description: 'Usuário criado com sucesso'})
  @ApiResponse({status:400, description: 'User Already exists'})
  async postNewUser(@Body() data:User ): Promise<User> {
    return this.userService.createNewUser(data);
  }

  @Put(':id')
  @ApiParam({ name:'id', type:'string' })
  @ApiBody({ type:User })
  @ApiResponse({status:200, description: 'Usuário atualizado com sucesso'})
  async putUpdateUser(@Param() { id }, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }
}
