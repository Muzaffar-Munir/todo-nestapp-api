import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialization, SpecializationSchema } from './specialization.schema';
import { SpecializationsController } from './specializations.controller';
import { SpecializationService } from './specializations.service';

@Module({
  controllers: [SpecializationsController],
  imports: [
    MongooseModule.forFeature([
      { name: Specialization.name, schema: SpecializationSchema },
    ]),
  ],
  providers: [SpecializationService],
})
export class SpecializationsModule {}
