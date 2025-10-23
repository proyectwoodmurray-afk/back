import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkWithUsDto } from './dto/create-workwithus.dto';
import { WorkWithUs, WorkWithUsDocument } from './schemas/workwithus.schema';

@Injectable()
export class WorkWithUsService {
  constructor(
    @InjectModel(WorkWithUs.name) private workWithUsModel: Model<WorkWithUsDocument>,
  ) {}

  async create(createDto: CreateWorkWithUsDto): Promise<WorkWithUs> {
    const created = new this.workWithUsModel(createDto);
    return created.save();
  }

  async findAll(): Promise<WorkWithUs[]> {
    return this.workWithUsModel.find().exec();
  }
}