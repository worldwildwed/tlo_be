import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export class Hashing {
    
    static hashPassword = async (password) => {
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash
    }

    static isPasswordMatched = async (password, hash) => {
        const isMatch = await bcrypt.compare(password, hash)
        return isMatch
    }

}