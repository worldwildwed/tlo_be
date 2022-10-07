import { Owner } from "../entity/owner.entity";
import { PersonalCar } from "../entity/personalCar.entity";


interface registerCarFormDTO{
    plateNumber: string,
    province: string,
    color: string,
    carNumber: string,
    plateRegisterDate: string,
}


export interface NewCarRecordDTO {
    owner: Owner;
    possessor: Owner;
    plateNumber: string;
    province: string;
    color: string;
    carNumber: string;
    plateRegisterDate: string;
}

export interface PostCarRegisterDTO{
    car: registerCarFormDTO
    owner: Owner
    possessor: Owner
}
