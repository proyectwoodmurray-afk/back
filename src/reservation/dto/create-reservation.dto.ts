// src/reservation/dto/create-reservation.dto.ts
import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReservationDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  projectAddress: string;

  @IsString()
  projectType: string;

  @IsOptional()
  @IsString()
  serviceLevel?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value !== undefined && value !== null && value !== '' ? Number(value) : undefined)
  estimatedBudget?: number;

  @IsOptional()
  @IsString()
  desiredTimeline?: string;

  @IsOptional()
  @IsString()
  projectDescription?: string;

  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  preferCall?: boolean;

  @IsOptional()
  @IsString()
  status?: string;
}
