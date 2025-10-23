import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Company extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  tagline: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: Object })
  hours: Record<string, string>;

  @Prop({ type: Object })
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export const CompanySchema = SchemaFactory.createForClass(Company); 