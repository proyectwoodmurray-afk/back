import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateWorkWithUsDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  position: string;

  @IsString()
  experience: string;

  // El archivo se maneja aparte con @UploadedFile()
  @IsOptional()
  resume?: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}