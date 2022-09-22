import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../utils/data-source';
import { RegisterAgentDTO, RegisterDTO } from '../dto/user.dto';
import { User } from '../entity/user.entity';
import { Hashing } from '../utils/hashing';
import { Agent } from '../entity/agent.entity';

@Injectable()
export class UserService {

    async findOne(username: string): Promise<User> {
        const user = await AppDataSource.getRepository(User).findOneBy({ username: username });
        return user
    }

    async createNew(dto: registerForm) {
        const userRepo = await AppDataSource.getRepository(User)
        let newUser = new User()
        newUser.username = dto.username
        newUser.password = dto.password
        newUser.hash = await Hashing.hashPassword(dto.password)  //dto.password
        newUser.phone = dto.phone
        newUser.agent = await AppDataSource.manager.findOneBy(Agent, {id: dto.agentId})
        newUser.role = dto.role
        newUser.firstName = dto.firstName
        newUser.lastName = dto.lastName
        // newUser.agent = 
        await userRepo.save(newUser)
    }

    async createNewAgent(dto: RegisterAgentDTO) {
        const emptyObj = { name: '', detail: '', phone: '', address: ''}
        const merge = { ...emptyObj, ...dto }    
        return AppDataSource.manager.insert(Agent, merge)
    }

    async getProfile(userid: number): Promise<any> {
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userid });
        const { password, hash, ...formatUser} = user
        return formatUser
    }

    async findAgent(userid: number) {
        // const agentId = await AppDataSource.manager.findOneBy(User, {id: userid}, )
        const user = await AppDataSource.manager.find(User, {where: {id: userid}, relations: {agent: true}})
        // const agentId = await AppDataSource.query(`SELECT * FROM public.user where id = ${userid};`)
        return user[0].agent
    }
}

interface registerForm {
    username: string
    password: string
    role: number
    agentId: number
    phone?: string;
    firstName?: string
    lastName?: string
}