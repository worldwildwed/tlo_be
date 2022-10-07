import { Controller,UseGuards,Post,Get,Param,Body,Res,Request } from '@nestjs/common';
import { PersonalCarService } from './personal-car.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { PostRegisterDTO } from '../dto/user.dto';
import { Response } from 'express';
import { NewCarRecordDTO, PostCarRegisterDTO } from '../dto/personal-car.dto';
import { OwnerService } from '../owner/owner.service';

@Controller('personal-car')
export class PersonalCarController {
    constructor(private personalCarService:PersonalCarService,private ownerService:OwnerService){
        this.personalCarService = personalCarService
        this.ownerService = ownerService
    }
    
    // @UseGuards(JwtAuthGuard)
    @Post('register-car')
    async registerCar(
        @Body() dto: PostCarRegisterDTO,
        @Res() res: Response,
    ){
        try {
            const {car,owner,possessor} = dto
    
            const existingOwner = await this.ownerService.findOwnerByIdCard(owner.idCard)
            const isOwnerExist = existingOwner.length > 0
            const existingPossessor = await this.ownerService.findOwnerByIdCard(possessor.idCard)
            const isPossessorExist = existingPossessor.length > 0
          
            let _owner = null
            let _possessor = null

            if(isOwnerExist && !isPossessorExist){
                _owner = existingOwner[0]
                _possessor = await this.ownerService.createOwner(possessor)
            }else if(!isOwnerExist && isPossessorExist){
                _possessor = existingPossessor[0]
                _owner = await this.ownerService.createOwner(owner)
            }else if(isOwnerExist && isPossessorExist){
                _owner = existingOwner[0]
                _possessor = existingPossessor[0]
            }else{
                _owner = await this.ownerService.createOwner(owner)
                _possessor = await this.ownerService.createOwner(possessor)
            }
            console.log({_owner,_possessor})

            const newCarOBJ:NewCarRecordDTO = {
                ...car,
                owner:_owner,
                possessor: _possessor
            } 
            const newCar = await this.personalCarService.createCar(newCarOBJ)
            return res.status(201).send({
                registration:"created",
                car:newCar,
                owner:_owner,
                possessor:_possessor
            })
        }
        catch(err) {
            console.log(err)
            return res.status(400).send({
                error:"err"
            })
        }
    }

    @Get('personal-car/:id')
    async getCarById(@Param('id') id:string){
        console.log(id)
        const carRegister:any = {
            plateRegisterDate: '2021-01-01',
            plateNumber: 'กก 1234',
            province: 'กรุงเทพมหานคร',
            carType: 'รถยนต์',
            carCharacter: 'รถยนต์ส่วนบุคคล',
            carBrand: 'TOYOTA',
            carModel: 'CAMRY',
            carYear: '2019',
            carColor: 'สีดำ',
            carNumber: 'กก 1234',
            carNumberIsOn: 'กก 1234',
            carEngineBrand: 'TOYOTA',
            carEngineNumber: '123456789',
            carEngineNumberIsOn: '123456789',
            carFuelType: 'เบนซิน',
            carFuelChassisNumber: '123456789',
            carNumberOfPiston: '4',
            carCC: '2000',
            carHorsePower: '200',
            carAxle: '2',
            carWheels: '4',
            carTire: '4',
            carWeight: '1000',
            carWeightLoad: '1000',
            carWeightTotal: '2000',
            carSeats: '5'
        }
        return carRegister
    }
    
    
}
