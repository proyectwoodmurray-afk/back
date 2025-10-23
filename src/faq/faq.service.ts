// src/faq/faq.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Faq, FaqDocument } from './schemas/faq.schema';
import { Model } from 'mongoose';
import { CreateFaqDto } from './dto/create-faq.dto';

@Injectable()
export class FaqService {
  constructor(@InjectModel(Faq.name) private faqModel: Model<FaqDocument>) {}

  create(dto: CreateFaqDto) {
    return this.faqModel.create(dto);
  }

  findAll() {
    return this.faqModel.find().exec();
  }

  delete(id: string) {
    return this.faqModel.findByIdAndDelete(id).exec();
  }
}
