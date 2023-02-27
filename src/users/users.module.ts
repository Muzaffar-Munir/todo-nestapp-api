import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/users.schema';
import { UsersController } from './users.controller';
import { UserRepositorysService } from './users.repository.service';
import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UserRepositorysService],
  imports: [
    // PassportModule,
    // JwtModule.register({
    //   secret: 'secretKey',
    //   signOptions: { expiresIn: '60s' },
    // }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserRepositorysService],
})
export class UsersModule {}
