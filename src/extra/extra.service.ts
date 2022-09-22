import { Injectable } from '@nestjs/common';
import { District } from '../entity/xtra/xtraDistrict.entity';
import { SubDistrict } from '../entity/xtra/xtraSubDistrict.entity';
import { AppDataSource } from '../utils/data-source';


@Injectable()
export class ExtraService {

    async getPredictFromSubDistrict (subdis: string) {
        return AppDataSource.manager.find(SubDistrict, { where: {SUB_DISTRICT_NAME: subdis}, relations: { pro: true, dis: true}})
    }

    async getDetailFromSubDistrict (subdis: string) {
        return AppDataSource.createQueryBuilder(District, 'd')
                .leftJoinAndSelect("d.dis", "district")
                .where('sb.SUB_DISTRICT_NAME = :name', { name: subdis})
                .getMany()
    }

}
