// src/services/services.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service, ServiceSchema } from './schemas/service.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module'; // Importa tu módulo de Cloudinary
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
    CloudinaryModule, // <-- Importa el módulo de Cloudinary aquí
    ConfigModule,     // <-- Importa el módulo de Config aquí
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
