/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CoursesDocument = Courses & Document;
@Schema() export class Courses {
  @Prop({ required: true }) name: string;

  @Prop({ required: true })
  creditHour: number;
  
  @Prop()
  createdAt?: Date;
}

export const CoursesSchema = SchemaFactory.createForClass(Courses);