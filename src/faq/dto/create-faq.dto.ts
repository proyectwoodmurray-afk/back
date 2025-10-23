// src/faq/dto/create-faq.dto.ts
import { IsString } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}
