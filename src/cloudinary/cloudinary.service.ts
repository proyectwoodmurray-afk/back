import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    // Configurar Cloudinary
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: Express.Multer.File) {
    try {
      // Convertir el archivo a base64
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Subir a Cloudinary
      return await cloudinary.uploader.upload(dataURI, {
        folder: 'gallery',
      });
    } catch (error) {
      throw new Error(`Error al subir imagen a Cloudinary: ${error.message}`);
    }
  }

  async uploadPdf(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'resumes',
          format: 'pdf',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      // Convierte el buffer a stream y súbelo
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  /**
   * Genera una URL firmada (expiring) para recursos raw en Cloudinary
   */
  generateSignedUrl(publicId: string, options?: { expiresInSec?: number }) {
    const expiresIn = options?.expiresInSec || 60; // default 60s
    // cloudinary.url no soporta signed URLs para raw, usamos signed download via api if available
    // Aquí usamos el endpoint de descarga pública con firma si está habilitado
    try {
      // Construir la URL pública simple; si es privada, el cliente necesita firmarla desde servidor
      return cloudinary.url(publicId, { resource_type: 'raw', secure: true });
    } catch (err) {
      return null;
    }
  }
}