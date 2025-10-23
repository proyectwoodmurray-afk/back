// src/gallery/gallery.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gallery, GalleryDocument } from './schemas/gallery.schema';
import { Model } from 'mongoose';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Express } from 'express';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
    private configService: ConfigService,
    private cloudinaryService: CloudinaryService
  ) {
    // Configurar Cloudinary
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async create(file: Express.Multer.File, dto: CreateGalleryDto) {
    try {
      // Subir imagen a Cloudinary
      const result = await this.cloudinaryService.uploadImage(file);
      
      // Crear nuevo item de galería con la URL de la imagen
      const newGallery = new this.galleryModel({
        ...dto,
        imageUrl: result.secure_url,
      });
      
      return await newGallery.save();
    } catch (error) {
      throw new Error(`Error al crear item de galería: ${error.message}`);
    }
  }

  findAll() {
    return this.galleryModel.find().exec();
  }

  async delete(id: string) {
    const item = await this.galleryModel.findById(id);
    if (!item) {
      throw new BadRequestException('Imagen no encontrada');
    }

    // Extraer el public_id de la URL de Cloudinary
    const publicId = item.imageUrl.split('/').slice(-1)[0].split('.')[0];
    
    try {
      // Eliminar la imagen de Cloudinary
      await cloudinary.uploader.destroy(`gallery/${publicId}`);
      // Eliminar el documento de la base de datos
      return this.galleryModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new BadRequestException('Error al eliminar la imagen: ' + error.message);
    }
  }

  findByTags(tags: string[]) {
    return this.galleryModel.find({ tags: { $in: tags } }).exec();
  }
}
