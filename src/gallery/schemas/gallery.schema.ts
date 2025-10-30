// src/gallery/schemas/gallery.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true })
export class Gallery {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  description: string;
  
  @Prop({ required: true, default: 'generic' })
  imageType: string;

}
export const GallerySchema = SchemaFactory.createForClass(Gallery);
