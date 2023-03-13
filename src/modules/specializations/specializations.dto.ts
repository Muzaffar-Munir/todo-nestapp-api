import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateSpecializationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
