import { Injectable } from '@nestjs/common';
import { Owner } from '../entity/owner.entity';
import { AppDataSource } from '../utils/data-source';

@Injectable()
export class OwnerService {
    
    async createOwner(dto: Owner) {
        const ownerRepo = await AppDataSource.getRepository(Owner)
        let newOwner = new Owner()
        newOwner = {
            ...newOwner,
            ...dto
        }
        return await ownerRepo.save(newOwner)
    }


    async findOwnerByIdCard(idCard: string) {
        return await AppDataSource.manager.find(Owner, {where: {idCard: idCard}})
    }
}


