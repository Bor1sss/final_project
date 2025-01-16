import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { AuthModel } from '../models/auth.model';

// Import the SignInDto class

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiProperty()
  @ApiBody({ type: AuthModel })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return {
      message: 'User data retrieved successfully',
      user: req.user || null, // Покажет данные, если они есть
    };
  }
}
