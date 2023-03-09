/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Delete, Param, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { hash } from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UserService) { }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers() {
        return await this.usersService.findAll()
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
        createUserDto.role = 'doctor';
        createUserDto.createdAt = new Date();
        createUserDto.updatedAt = new Date();
        const hashedPassword = await hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;
        // const user = await this.usersService.createUser(request);
        // return response.json(createUserDto);
        try {
            
            const users = await this.usersService.createUser(createUserDto);
            return response.json({ status: 'success', message: `User List`, users });
          } catch (error) {
            throw new Error(error)
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              status: 'error',
              message: `Something Went Wrong : ${error.message}`,
            });
          }
        // return user;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.usersService.delete(id);
    }
}
