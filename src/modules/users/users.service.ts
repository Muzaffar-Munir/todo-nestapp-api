import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './users.schema';
import { hash } from 'bcrypt';
import { IPaginatedResponse } from 'src/common/interfaces/response.interface';
import { ERoles } from 'src/common/enum/role';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<any[]> {
    return await this.model.find().exec();
  }

  async createUser(body: CreateUserDto) :Promise<CreateUserDto>{
   const hashPassword = await hash(body.password, 10);
   try {
    const user =  await this.model.create({...body,
      role: ERoles.DOCTOR,
      createdAt: new Date(),
      password: hashPassword,
      });
    return user;
   } catch(error){
    throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, description: 'Something went wrong!' })
   }
   
  }

  async update(id: string, payloads: any): Promise<any> {
    return await this.model.findByIdAndUpdate(id, payloads).exec();
  }

  async delete(id: string): Promise<any> {
    return await this.model.findByIdAndDelete(id).exec();
  }
  async getUser(query: object): Promise<User | any> {
    return this.model.findOne(query);
  }

  async markEmailAsConfirmed(email: string) {
    return this.model.updateOne({ email }, {
      isVerified: true
    }).exec();
  }
}
