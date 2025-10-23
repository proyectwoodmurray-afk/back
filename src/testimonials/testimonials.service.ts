import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial } from './schemas/testimonial.schema';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name) private testimonialModel: Model<Testimonial>,
  ) {}

  async findAll() {
    return await this.testimonialModel.find({ active: true }).exec();
  }

  async findOne(id: string) {
    const testimonial = await this.testimonialModel.findById(id).exec();
    if (!testimonial) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado`);
    }
    return testimonial;
  }

  async create(createTestimonialDto: CreateTestimonialDto) {
    const createdTestimonial = new this.testimonialModel(createTestimonialDto);
    return await createdTestimonial.save();
  }

  async update(id: string, updateTestimonialDto: Partial<CreateTestimonialDto>) {
    const updatedTestimonial = await this.testimonialModel
      .findByIdAndUpdate(id, updateTestimonialDto, { new: true })
      .exec();
    
    if (!updatedTestimonial) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado`);
    }
    
    return updatedTestimonial;
  }

  async remove(id: string) {
    const deletedTestimonial = await this.testimonialModel
      .findByIdAndUpdate(id, { active: false }, { new: true })
      .exec();
    
    if (!deletedTestimonial) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado`);
    }
    
    return deletedTestimonial;
  }

  async hardDelete(id: string) {
    const deletedTestimonial = await this.testimonialModel
      .findByIdAndDelete(id)
      .exec();
    
    if (!deletedTestimonial) {
      throw new NotFoundException(`Testimonio con ID ${id} no encontrado`);
    }
    
    return deletedTestimonial;
  }
} 