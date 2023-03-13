import { Controller, Get, Post, Body, Delete, Param, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './users.service';


import { CreateUserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmailConfirmationService } from './email-confirmation.service';
@Controller('user')
export class UsersController {

    constructor(private readonly userService: UserService,
        private readonly emailService: EmailConfirmationService) { }

    @Get('current')
    @UseGuards(JwtAuthGuard)
    async getLoginUser(@Req() req: any) {
        return await this.userService.getUser({ _id: req.user._id });
    }

    @Post()
    async create(@Body() body: CreateUserDto) {
        try {
            const user = await this.userService.createUser(body)
            await this.emailService.sendVerificationLink(user.email);
            return user;
        } catch (err) {
            console.log(err);
        }
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUser(@Param('id') id: string) {
        return await this.userService.delete(id);
    }


    @Get('confirm-email')
    async confirm(@Query('token') confirmationData: string) {
        const email = await this.emailService.decodeConfirmationToken(confirmationData);
        return await this.emailService.confirmEmail(email);
    }
}
