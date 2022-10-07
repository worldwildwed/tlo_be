import { Injectable } from '@nestjs/common';
import { District } from '../entity/xtra/xtraDistrict.entity';
import { SubDistrict } from '../entity/xtra/xtraSubDistrict.entity';
import { AppDataSource } from '../utils/data-source';
import { Zipcode } from '../entity/xtra/xtraZipcode.entity';
import { Province } from '../entity/xtra/xtraProvince.entity';



@Injectable()
export class ExtraService {

    async getPredictFromSubDistrict (subdis: string) {
        return AppDataSource.manager.find(SubDistrict, { where: {SUB_DISTRICT_NAME: subdis}, relations: { pro: true, dis: true}})
    }

    async getDetailFromSubDistrict (subdis: string) {
        return AppDataSource.createQueryBuilder(SubDistrict, 'sb')
                .leftJoinAndSelect("sb.dis","district")
                .leftJoinAndSelect("sb.pro","province")
                .leftJoinAndSelect("sb.geo","geo")
                .where('sb.SUB_DISTRICT_NAME ILIKE :name', { name: `%${subdis}%`})
                .getMany()
                
              
    }

    async findZipCodeBySubDistrictID(id: number){
        return AppDataSource.createQueryBuilder(Zipcode, 'zc').where('zc.SUB_DISTRICT_ID = :id', { id: id}).getMany()
    }

    async getAllProvince(){
        return AppDataSource.getRepository(Province).createQueryBuilder('pro').cache(6000).getMany()
    }

    async getDistrictByProvinceId(id: number){
        return AppDataSource.createQueryBuilder(District, 'dis')
                .where('dis.PROVINCE_ID = :id', {id})
                .getMany()
    }

    async getSubDistrictByDistrictId(id: number){
        return AppDataSource.createQueryBuilder(SubDistrict, 'sd')
                .where('sd.DISTRICT_ID = :id', {id})
                .getMany()
    }


}
