/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SpecializationsModule } from './modules/specializations/specialization.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/doctor-patient-solution'),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        EMAIL_FROM: Joi.string().required(),
        // ...
      }),
    }),
    UsersModule, AuthModule, SpecializationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
