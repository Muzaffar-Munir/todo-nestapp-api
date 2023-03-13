import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import VerificationTokenPayload from 'src/common/interfaces/verificationTokenPayload.interface';
import { UserService } from './users.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}d`,
    });

    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
    return this.sendEmail(text, email);
  }

  private async sendEmail(emailText: string, email: string) {
    console.log('in sendEm');
    try {
      await this.mailerService.sendMail({
        // later replace these email to user email
        // to: 'muzaffar.munir@virtual-force.com', // list of receivers
        to: email,
        from: this.configService.get('EMAIL_FROM'),
        subject: 'Testing Nest MailerModule ✔',
        text: emailText, // plaintext body
      });
      console.log('email sent');
    } catch (err) {
      console.log(err);
    }
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.getUser({ email: email });
    if (user.isVerified) {
      throw new BadRequestException('Email already confirmed');
    }

    return await this.userService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    // will be used on confirmation from url to check either token is valid or not
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      console.log(error);
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
