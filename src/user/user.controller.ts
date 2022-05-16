import { Controller, Param, Get, Post, Put, Body, Logger } from '@nestjs/common';
import CreateUser from './interfaces/createUser.interface';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserByID(@Param() { id }:any): Promise<any> {
    Logger.log(`Attempting to search for user: ${id}`)
    return this.userService.searchUserById(id);
  }

  @Post()
  async postNewUser(@Body() data:CreateUser ): Promise<User> {
    return this.userService.createNewUser(data);
  }

  @Put(':id')
  async putUpdateUser(@Param() { id }:any , @Body() user:any): Promise<any> {
    return this.userService.updateUser(id, user);
  }
}
