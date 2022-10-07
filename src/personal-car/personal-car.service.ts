import { Injectable } from '@nestjs/common';
import { NewCarRecordDTO } from '../dto/personal-car.dto';
import { PersonalCar } from '../entity/personalCar.entity';
import { AppDataSource } from '../utils/data-source';

@Injectable()
export class PersonalCarService {

    async createCar(dto: NewCarRecordDTO) {
        const carRepo = await AppDataSource.getRepository(PersonalCar)
        let newCar = new PersonalCar()
        newCar.plateNumber = dto.plateNumber
        newCar.plateRegisterDate = dto.plateRegisterDate
        newCar.province = dto.province
        newCar.carNumber = dto.carNumber
        newCar.carColor = dto.color
        newCar.owner = dto.owner
        newCar.possessor = dto.possessor
        return await carRepo.save(newCar)
    }

    async findByPlate(plate:string):Promise<PersonalCar>{
        const car = await AppDataSource.getRepository(PersonalCar).findOneBy({ plateNumber: plate });
        return car
    }
}
