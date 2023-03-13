import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/users.schema';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfigModule } from '@nestjs/config';
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
    MailerModule.forRoot({
      transport: {
        // host: 'smtp.sendgrid.net',
        // port: 587,
        // auth: {
        //   user: 'zNo3hZ7GRA6GyGisHGUzuw',
        //   pass: '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',
        // },
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '26e01072159078',
          pass: '7d9c181a9974f4',
        },
      },
    }),
  ],
  exports: [UserService],
})
export class UsersModule {}
