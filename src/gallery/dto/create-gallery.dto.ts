// src/gallery/dto/create-gallery.dto.ts
import { IsString, IsArray, ArrayNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateGalleryDto {
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @IsIn(['generic', 'background-main', 'background-gallery', 'hero', 'thumbnail'])
  imageType?: string;


}
