import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;
  @Prop({
    required: true,
    unique: true,
  })
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
