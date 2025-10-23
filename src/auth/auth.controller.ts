import { Controller, Post, Body, Get, UseGuards, Request, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    this.logger.log(`Intento de registro con email: ${dto.email}`);
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    this.logger.log(`Intento de login con email: ${dto.email}`);
    try {
      const result = await this.authService.login(dto);
      this.logger.log(`Login exitoso para el email: ${dto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`Error en login para el email ${dto.email}: ${error.message}`);
      throw error;
    }
  }

  // Ruta protegida de prueba
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    this.logger.log(`Acceso al perfil del usuario: ${req.user.email}`);
    return {
      message: 'Usuario autenticado correctamente',
      user: req.user,
    };
    console.log(req.user)

  }
}
