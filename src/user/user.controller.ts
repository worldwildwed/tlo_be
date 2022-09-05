import { Controller, Get, Post, Body, Res, Request, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PermissionGuard } from '../auth/permission.guard';
import { AppDataSource } from '../data-source';
import { RegisterDTO } from '../dto/user.dto';
import { User } from '../entity/User';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Get('findAll')
    async findAll(): Promise<User[]> {
        const users = await AppDataSource.manager.find(User)
        return users
    }

    @Post('register')
    async register(
        @Body() dto: RegisterDTO,
        @Res() res: Response
    ) {
        try {
            await this.userService.createNew(dto)
        }
        catch(err) {
            console.log(err)
        }
        return res.status(200).send({ message: "This is OK"})
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Get('profile')
    async profile(@Request() req){
        const userid = req.user.userid
        const user = await this.userService.getProfile(userid)
        return user
    }
}


