import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './models/dto/user-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: UserLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'You have authorized!';
  }
}
