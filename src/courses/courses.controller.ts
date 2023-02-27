/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {

    constructor(private readonly coursesService: CoursesService) { }
    @Get('***')
    getHello(): string {
        return 'hello from courses';
    }


    @Post()
    async create(@Body() request: any) {
        return await this.coursesService.create(request);
    }
}
