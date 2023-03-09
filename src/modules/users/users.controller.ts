/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param, UseGuards,Req } from '@nestjs/common';
import { UserService } from './users.service';


import { CreateUserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UsersController {

    constructor(private readonly userService: UserService) { }
   
    @Get('current')
    @UseGuards(JwtAuthGuard)
    async getLoginUser(@Req() req) {
        return await this.userService.getUser({_id: req.user._id});
    }

    @Post()
    create(@Body() body: CreateUserDto) {
     return this.userService.createUser(body);
    }

    
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id: string) {
        return await this.userService.delete(id);
    }
}
