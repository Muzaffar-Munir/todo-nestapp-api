/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UserService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers() {
        return await this.usersService.findAll()
    }

    @Post()
    create(@Body() body: CreateUserDto) {
     return this.usersService.createUser(body);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.delete(id);
    }
}
