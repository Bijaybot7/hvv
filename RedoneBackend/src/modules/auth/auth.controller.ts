import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/common/gaurds/auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK) // returns code 200 when success instead of 201
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  signIn(@Body() signInDto: SignInDto, @Request() req) {
    return this.authService.validateUserCredentials(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGaurd)
  @Get('profile')
  getProfile(@Body() dto: SignInDto, @Request() req) {
    return { user: req.user, body: req.body };
  }
}
