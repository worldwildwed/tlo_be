import { Controller ,Post,Body,Req,Res,} from '@nestjs/common';
import { PostRegisterDTO } from '../dto/user.dto';
import { OwnerService } from './owner.service';
import { Response } from 'express';
import { Owner } from '../entity/owner.entity';

@Controller('owner')
export class OwnerController {
    constructor(private ownerService:OwnerService){
        this.ownerService = ownerService
    }

    @Post('create')
    async createOwner(
        @Body() dto: Owner,
        @Res() res: Response,
    ){
        try {
            const newOwner = await this.ownerService.createOwner(dto)
            return res.status(201).send({
                created:newOwner,
            })
        }
        catch(err) {
            console.log(err)
            return res.status(400).send({
                error:"err"
            })
        }
    }

}
