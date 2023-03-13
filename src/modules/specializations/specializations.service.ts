import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Specialization, SpecializationDocument } from './specialization.schema';
import { CreateSpecializationDto } from './specializations.dto';

@Injectable()
export class SpecializationService {
    constructor(@InjectModel(Specialization.name) private readonly model: Model<SpecializationDocument>) { }

    async findAll(): Promise<any[]> {
        return await this.model.find().exec();
    }

    async createSpecialization(body: CreateSpecializationDto): Promise<CreateSpecializationDto> {
        try {
            const user = await this.model.create({
                ...body,
                createdAt: new Date(),
            });
            return user;
        } catch (error) {
            throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, description: 'Something went wrong!' })
        }

    }

    async updateASpeciality(id: string, body: CreateSpecializationDto): Promise<CreateSpecializationDto> {
        try {
            await this.model.findByIdAndUpdate(id,{
                ...body,
                updatedAt: new Date(),
            }).exec();
            return await this.model.findById(id).exec();
        } catch (error) {
            throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, description: 'Something went wrong!' })
        }
    }

    async deleteSpeciality(id: string): Promise<any> {
        try {
            await this.model.findByIdAndDelete(id, {deletedAt: new Date()}).exec();
            return {success: true, message: 'category is deleted'};
        } catch (error) {
            throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, description: 'Something went wrong!' })
        } 
    }
    async getASpeciality(query: object): Promise<any> {
        return this.model.findOne(query);
    }
}
