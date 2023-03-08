import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/users/users.schema';

@Injectable()
export class UserRepositorysService {
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'ali@gmail.com',
  //     password: 'ali',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<any[]> {
    return await this.model.find().exec();
  }

  // async findOne(id: string): Promise<any> {
  //   return await this.model.findById(id).exec();
  // }

  async createUser(payloads: any): Promise<any> {
    const createdUser = await new this.model({
      ...payloads,
      createdAt: new Date(),
    }).save();

    return createdUser;
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

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }
}
