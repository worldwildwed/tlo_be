import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { RegisterDTO } from '../dto/user.dto';
import { User } from '../entity/User';
import { Hashing } from '../utils/hashing';

@Injectable()
export class UserService {

    async findOne(username: string): Promise<User> {
        const user = await AppDataSource.getRepository(User).findOneBy({ username: username });
        return user
    }

    async createNew(dto: RegisterDTO) {
        const userRepo = await AppDataSource.getRepository(User)
        let newUser = new User()
        newUser.username = dto.username
        newUser.password = dto.password
        newUser.hash = await Hashing.hashPassword(dto.password)  //dto.password
        newUser.phone = dto.phone
        newUser.bankacc = dto.bankacc
        await userRepo.save(newUser)
    }

    async getProfile(userid: number): Promise<any> {
        const user = await AppDataSource.getRepository(User).findOneBy({ id: userid });
        const { password, hash, ...formatUser} = user
        return formatUser
    }
}
