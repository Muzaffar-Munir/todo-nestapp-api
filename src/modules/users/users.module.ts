import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/users.schema';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  controllers: [UsersController],
  providers: [UserService, EmailConfirmationService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('EMAIL_HOST'),
          port: config.get<number>('EMAIL_PORT'),
          auth: {
            user: config.get<string>('EMAIL_API_KEY'),
            pass: config.get<string>('EMAIL_SECRET_KEY'),
          },
        },
      }),
    }),
  ],
  exports: [UserService],
})
export class UsersModule {}
