import { Injectable } from '@nestjs/common';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source'; 
import { EmailDTO } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Hashing } from '../utils/hashing';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
      ) {}

    
    
    async validateEmail(emailDTO: EmailDTO) {
        // const user = new User()
        const userRepo = await AppDataSource.getRepository(User)
        const result = await userRepo.findOneBy({
            email: emailDTO.email
        })
        if (!result) {
            return { status: 700, data: 'User Not Found'}
        }
        const { password, ...response } = result
        return { status: 200, data: response }
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username)
        if (user) {
          const isMatch = await Hashing.isPasswordMatched(pass, user.hash)
          if (isMatch) {
            const { password, hash, ...result } = user;
            return result; // User Detail Except password
          }
          else {
            return 777
          }
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { userid: user.id, role: user.role, username: user.username };
        console.log(payload)
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

} 
