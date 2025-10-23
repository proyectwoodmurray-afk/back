// src/contact/contact.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}

  create(dto: CreateContactDto) {
    return this.contactModel.create(dto);
  }

  findAll() {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  delete(id: string) {
    return this.contactModel.findByIdAndDelete(id).exec();
  }
}
