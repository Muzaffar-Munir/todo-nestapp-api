/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService, 
    private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.getUser({username});
      const isPasswordValid = await compare(pass, user?.password);
      
      if (user && isPasswordValid) {
        return user;
      }
      return null;
    }
  
    async login(user: any) {
      const payload = { username: user.username, _id: user._id, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
