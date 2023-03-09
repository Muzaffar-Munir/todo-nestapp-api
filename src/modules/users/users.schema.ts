import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  age: number;
  @Prop()
  password: string;
  role: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
