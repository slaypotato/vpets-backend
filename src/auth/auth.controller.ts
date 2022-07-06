import { Controller, Request, Post, UseGuards, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { string } from 'joi';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthSchema } from './schemas/auth.schema';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('')
  @ApiBearerAuth('access_token')
  @ApiBody({type: AuthSchema})
  @ApiResponse({status: 200, description: 'Usuário logado com sucesso' })
  @ApiResponse({status: 401, description: 'Unauthorized' })
  async login(@Request() req) {
    Logger.log(`Attempting to login user ${req.user._doc.userName}`)
    return await this.authService.login(req.user);
  }
}