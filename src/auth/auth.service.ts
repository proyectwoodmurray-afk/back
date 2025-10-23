// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    this.logger.log(`Iniciando registro para email: ${dto.email}`);
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({ email: dto.email, password: hashed });
    const result = await user.save();
    this.logger.log(`Registro exitoso para email: ${dto.email}`);
    return result;
  }

  async login(dto: LoginDto) {
    this.logger.log(`Buscando usuario con email: ${dto.email}`);
    const user = await this.userModel.findOne({ email: dto.email });
    
    if (!user) {
      this.logger.warn(`Usuario no encontrado: ${dto.email}`);
      throw new UnauthorizedException('Usuario no encontrado');
    }

    this.logger.log(`Verificando contraseña para usuario: ${dto.email}`);
    const match = await bcrypt.compare(dto.password, user.password);
    
    if (!match) {
      this.logger.warn(`Contraseña incorrecta para usuario: ${dto.email}`);
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { email: user.email, sub: user._id, role: user.role };
    const token = this.jwtService.sign(payload);
    this.logger.log(`Login exitoso para usuario: ${dto.email}`);
    
    return {
      access_token: token,
    };
  }
}
