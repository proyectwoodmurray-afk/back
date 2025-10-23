// src/gallery/dto/create-gallery.dto.ts
import { IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateGalleryDto {
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;


}
