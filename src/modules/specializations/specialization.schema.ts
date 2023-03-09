import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type SpecializationDocument = Specialization & Document;
@Schema()
export class Specialization {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  description: string;
  @Prop({ required: true, trim: true })
  price: number;
  @Prop({ default: Date.now() })
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const SpecializationSchema =
  SchemaFactory.createForClass(Specialization);
