// src/services/services.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Express } from 'express';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    private configService: ConfigService,
    private cloudinaryService: CloudinaryService
  ) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async createWithImage(dto: CreateServiceDto, file: Express.Multer.File) {
    try {
      // Subir imagen a Cloudinary
      const result = await this.cloudinaryService.uploadImage(file);

      // Crear nuevo servicio con la URL de la imagen
      const newService = new this.serviceModel({
        ...dto,
        image: result.secure_url,
      });

      return await newService.save();
    } catch (error) {
      throw new Error(`Error al crear servicio: ${error.message}`);
    }
  }

  findAll() {
    return this.serviceModel.find().exec();
  }

  findByCategory(category: string) {
    return this.serviceModel.find({ category }).exec();
  }

  async delete(id: string) {
    const item = await this.serviceModel.findById(id);
    if (!item) {
      throw new BadRequestException('Servicio no encontrado');
    }

    // Extraer el public_id de la URL de Cloudinary
    const publicId = item.image?.split('/').slice(-1)[0].split('.')[0];

    try {
      // Eliminar la imagen de Cloudinary (opcional, si quieres limpiar imágenes)
      if (publicId) {
        await cloudinary.uploader.destroy(`services/${publicId}`);
      }
      // Eliminar el documento de la base de datos
      return this.serviceModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new BadRequestException('Error al eliminar el servicio: ' + error.message);
    }
  }
// Agregar este método a la clase ServicesService
async update(id: string, updateData: any, file?: Express.Multer.File) {
  try {
    const service = await this.serviceModel.findById(id);
    if (!service) {
      throw new BadRequestException('Servicio no encontrado');
    }

    let updateObject = { ...updateData };

    // Si se proporciona una nueva imagen, subirla
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      updateObject.image = result.secure_url;
      
      // Opcional: eliminar la imagen anterior de Cloudinary
      if (service.image) {
        const publicId = service.image.split('/').slice(-1)[0].split('.')[0];
        await cloudinary.uploader.destroy(`services/${publicId}`);
      }
    }

    return await this.serviceModel.findByIdAndUpdate(id, updateObject, { new: true });
  } catch (error) {
    throw new BadRequestException(`Error al actualizar servicio: ${error.message}`);
  }
}
  // Puedes agregar más métodos según lo necesites
}
