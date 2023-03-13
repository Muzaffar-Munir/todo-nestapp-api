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

    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.usersService.getUser({email: email});
      const isPasswordValid = user ? await compare(pass, user?.password) : false;
      
      if (user && isPasswordValid) {
        return user;
      }
      return null;
    }
  
    async login(user: any) {
      const payload = { email: user.email, role: user.role, _id: user._id, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}
