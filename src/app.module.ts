/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SpecializationsModule } from './modules/specializations/specialization.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/doctor-patient-solution'), UsersModule, AuthModule, SpecializationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
