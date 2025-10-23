import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkWithUsDocument = WorkWithUs & Document;

@Schema({ timestamps: true })
export class WorkWithUs {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  position: string;

  @Prop()
  experience: string;

  @Prop()
  resume?: string; // URL o path del archivo

  @Prop()
  coverLetter?: string;
}

export const WorkWithUsSchema = SchemaFactory.createForClass(WorkWithUs);