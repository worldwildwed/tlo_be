import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmailDTO, LoginDTO } from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    // @Get(':email')
    // validate(
    //     @Param() email: EmailDTO
    // ) {
    //     // console.log('BODY =', req, typeof req, req["email"])
    //     // const email = req["email"]
    //     return this.authService.validateEmail(email);
    // }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Body() loginDTO: LoginDTO,
        @Request() req
    ) {
        const user = req.user
        console.log('req.user', user)
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@Request() req){
        // console.log(req)
        return req.user
    }

}
