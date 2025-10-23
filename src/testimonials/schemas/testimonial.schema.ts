import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Testimonial extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  image: string;

  @Prop()
  position: string;

  @Prop()
  company: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: Number, min: 1, max: 5 })
  rating: number;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial); 