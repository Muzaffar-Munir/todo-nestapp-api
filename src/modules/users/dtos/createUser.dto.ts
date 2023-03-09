/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  age: number;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  role: string;
  @IsOptional()
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

