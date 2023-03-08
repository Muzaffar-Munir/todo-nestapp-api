/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { UserRepositorysService } from './users.repository.service';
import { hash } from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UserRepositorysService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers() {
        return await this.usersService.findAll()
    }

    @Post()
    async create(@Body() request: any) {
        const saltOrRounds = 10;
        const hashedPassword = await hash(request.password, saltOrRounds);
        request.password = hashedPassword;
        const user = await this.usersService.createUser(request);
        return user;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.delete(id);
    }
}
