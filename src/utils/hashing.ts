import * as bcrypt from 'bcrypt';
var md5 = require('md5');

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

    static genPassForMaster = (txt: string):string => {
        const hash = md5(txt)
        const password = hash.slice(hash.length-6, hash.length)
        return password
    }

}