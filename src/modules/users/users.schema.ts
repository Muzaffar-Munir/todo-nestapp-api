import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
    unique: true,
  })
  email: string;
  @Prop()
  age: number;
  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true })
  role: string;
  @Prop({ default: false })
  isActive?: boolean;
  @Prop({ default: false })
  isVerified?: boolean;
  @Prop({ default: Date.now() })
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
