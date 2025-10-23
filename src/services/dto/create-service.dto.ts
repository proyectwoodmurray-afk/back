// src/services/dto/create-service.dto.ts
import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(['construction', 'update', 'demolition'])
  category: string;

  @IsEnum(['basic', 'better', 'luxury'])
  type: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  featured?: boolean;
}
