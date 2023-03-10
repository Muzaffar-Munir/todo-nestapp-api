/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
     secret: jwtConstants.secret,
        signOptions: { expiresIn: '5m' },
      }),
],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [ AuthService ]
})
export class AuthModule {}
