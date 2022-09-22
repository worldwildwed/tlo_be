import { Controller, Get, Post, Body, Res, Request, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt.guard';
// import { PermissionGuard, Role } from '../auth/permission.guard';
import { AppDataSource } from '../utils/data-source';
import { RegisterDTO, RegisterAgentDTO, PostRegisterDTO } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { RoleGuard, Role} from '../auth/role.guard';
import { Hashing } from '../utils/hashing';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
    @Get('findAll')
    async findAll(): Promise<User[]> {
        const users = await AppDataSource.manager.find(User)
        return users
    }

    @UseGuards(JwtAuthGuard, RoleGuard(Role.ADMIN))
    @Post('register')
    async register(
        @Body() dto: PostRegisterDTO,
        @Res() res: Response,
        @Request() req
    ) {
        console.log(req.user)
        try {
            // find agentId from this user
            const agent = await this.userService.findAgent(req.user.userid)
            
            const newUser = { agentId: agent.id, ...dto}
            console.log(newUser)
            await this.userService.createNew(newUser)
        }
        catch(err) {
            console.log(err)
        }
        return res.status(200).send({ message: "This is OK"})
    }

    @Post('register/agent')
    async registerAgent(
        @Body() dto: RegisterAgentDTO,
        @Res() res: Response
    ) {
        try {
            const newAgent = await this.userService.createNewAgent(dto)
            console.log(newAgent)
            const agentId = newAgent.identifiers[0].id
            const pass = Hashing.genPassForMaster(dto.name)
            const masterUserForAgent = {
                username: 'master_' + agentId,
                password: pass,
                role: 9,
                firstName: 'automatically generated master user',
                agentId: agentId,
            }
            await this.userService.createNew(masterUserForAgent)
        }
        catch(err) {
            console.log(err)
        }
        return res.status(200).send({ message: "This is OK"})
    }

    @UseGuards(JwtAuthGuard, RoleGuard(Role.USER))
    @Get('profile')
    async profile(@Request() req){
        const userid = req.user.userid
        const user = await this.userService.getProfile(userid)
        return user
    }
}


