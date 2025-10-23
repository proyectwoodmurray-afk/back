// src/services/schemas/service.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['construction', 'update', 'demolition'] })
  category: string;

  @Prop({ required: true, enum: ['basic', 'better', 'luxury'] })
  type: string;

  @Prop()
  image: string;

  @Prop()
  featured?: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
