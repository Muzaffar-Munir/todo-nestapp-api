/* eslint-disable prettier/prettier */
import { IsBoolean, IsNotEmpty, IsNumber, isNumber, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
 @IsString()
  @IsNotEmpty()
 public readonly name:string;

  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsNumber()
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

