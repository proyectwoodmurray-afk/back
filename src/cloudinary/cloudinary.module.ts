import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [ConfigModule], // <-- Agrega esta línea
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
