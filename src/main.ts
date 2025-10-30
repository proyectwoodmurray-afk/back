import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true
  }));

  // Configuración de CORS: permitir domain del front en Vercel y localhost para desarrollo
  // Dominios permitidos (sin slash final)
  const allowedOrigins = new Set([
    'https://front-seven-lilac.vercel.app',
    'https://www.murrayandsonconstruction.ca',
    'https://murrayandsonconstruction.ca',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ].map(o => o.replace(/\/$/, '')));

  // Si existe una variable CORS_ORIGIN en la configuración, permitir su uso adicional
  const envOrigin = configService.get<string>('CORS_ORIGIN');
  if (envOrigin) {
    envOrigin.split(',').map(s => s.trim()).filter(Boolean).forEach(o => allowedOrigins.add(o.replace(/\/$/, '')));
  }

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, '');
      if (allowedOrigins.has(normalized)) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: This origin is not allowed'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers'
    ],
    exposedHeaders: ['Content-Length', 'Content-Type']
  });

  // Servir archivos estáticos (carpeta "uploads")
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Leer puerto desde .env
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
