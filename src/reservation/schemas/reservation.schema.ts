// src/reservation/schemas/reservation.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  projectAddress: string;

  @Prop({ required: true })
  projectType: string;

  @Prop()
  serviceLevel?: string;

  @Prop()
  estimatedBudget?: number;

  @Prop()
  desiredTimeline?: string;

  @Prop()
  projectDescription?: string;

  @Prop()
  preferCall?: boolean;

  @Prop({ required: false, default: 'pending' })
  status?: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
