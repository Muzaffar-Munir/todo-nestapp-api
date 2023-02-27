/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Courses, CoursesDocument } from 'src/schemas/courses.schema';

@Injectable()
export class CoursesService {
    constructor(@InjectModel(Courses.name) private readonly model: Model<CoursesDocument>) { }

    async findAll(): Promise<any[]> {
        return await this.model.find().exec();
    }

    async findOne(id: string): Promise<any> {
        return await this.model.findById(id).exec();
    }

    async create(payloads: any): Promise<any> {
        return await new this.model({
            ...payloads,
            createdAt: new Date(),
        }).save();
    }

    async update(id: string, payloads: any): Promise<any> {
        return await this.model.findByIdAndUpdate(id, payloads).exec();
    }

    async delete(id: string): Promise<any> {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
