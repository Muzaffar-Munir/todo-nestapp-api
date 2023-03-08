import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CoursesSchema } from 'src/modules/courses/courses.schema';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [
    MongooseModule.forFeature([{ name: Courses.name, schema: CoursesSchema }]),
  ],
})
export class CoursesModule {}
