import { Controller, Post, Res, Req ,Body, Get, Param} from '@nestjs/common';
import { Response } from 'express';
import { DataSource } from 'typeorm';
import { Geo } from '../entity/xtra/xtraGeo.entity';
import { Province } from '../entity/xtra/xtraProvince.entity';
import { AppDataSource } from '../utils/data-source';
import { ExtraService } from './extra.service';
import { DISTRICT, GEO, PROVINCE, SUBDISTRICT, ZIPCODE } from './extraConst';



@Controller('extra')
export class ExtraController {

    constructor(private extraService: ExtraService){}

    @Post('migrate/geo')
    async migrateGeo(@Res() res: Response) {
        const obj = GEO
        AppDataSource.manager.insert(Geo, obj)
        return res.status(200).send({ message: "Migrate is OK"})
    }
    @Post('migrate/province')
    async migrateProvince(@Res() res: Response) {
        let insert = 
        `INSERT INTO extra.province(
            "PROVINCE_ID", "PROVINCE_NAME", "GEO_ID")
            VALUES `
        const obj = PROVINCE
        for (let i=0; i < obj.length; i++) {
            let row = `(${obj[i].PROVINCE_ID}, '${obj[i].PROVINCE_NAME}', ${obj[i].GEO_ID}),`
            if (i == obj.length - 1) { row = `(${obj[i].PROVINCE_ID}, '${obj[i].PROVINCE_NAME}', ${obj[i].GEO_ID})`}
            insert += row
        }
        AppDataSource.query(insert)
        return res.status(200).send({ message: "Migrate is OK"})
    }
    @Post('migrate/district')
    async migrateDistrict(@Res() res: Response) {
        let insert = 
        `INSERT INTO extra.district(
            "DISTRICT_ID", "DISTRICT_NAME", "GEO_ID", "PROVINCE_ID")
            VALUES `
        const obj = DISTRICT
        for (let i=0; i < obj.length; i++) {
            let row = `(${obj[i].DISTRICT_ID}, '${obj[i].DISTRICT_NAME}', ${obj[i].GEO_ID}, ${obj[i].PROVINCE_ID}),`
            if (i == obj.length - 1) { row = row.slice(0, -1)} // remove comma for last row
            insert += row
        }
        AppDataSource.query(insert)
        return res.status(200).send({ message: "Migrate is OK"})
    }
    @Post('migrate/subdistrict')
    async migrateSubDistrict(@Res() res: Response) {
        let insert = 
        `INSERT INTO extra.sub_district(
            "SUB_DISTRICT_ID", "SUB_DISTRICT_NAME", "GEO_ID", "PROVINCE_ID", "DISTRICT_ID")
            VALUES `
        const insert_header = insert
        let inserts = []
        const obj = SUBDISTRICT
        for (let i=0; i < obj.length; i++) {
            let row = `(${obj[i].SUB_DISTRICT_ID}, '${obj[i].SUB_DISTRICT_NAME}', ${obj[i].GEO_ID}, ${obj[i].PROVINCE_ID}, ${obj[i].DISTRICT_ID}),`
            if (obj[i].PROVINCE_ID < 78) {
                if ((i % 1000 == 0 || i == obj.length - 1) && i != 0) { 
                    row = row.slice(0, -1)
                    insert += row
                    inserts.push(insert)
                    insert = insert_header
                    console.log(i, obj[i])
                } // remove comma for last row
                else {  insert += row }
    
            }
            
        }

        // let countErr = 0
        // const queryRunner = AppDataSource.createQueryRunner()
        // await queryRunner.connect()
        // for (let i = 0; i < obj.length; i++) {
        //     if (i > 4000 && i < 5000) {
        //         console.log(`run${i}}`)
        //         try {
        //             await queryRunner.query(`INSERT INTO extra.sub_district(
        //                 "SUB_DISTRICT_ID", "SUB_DISTRICT_NAME", "GEO_ID", "PROVINCE_ID", "DISTRICT_ID")
        //                 VALUES (${obj[i].SUB_DISTRICT_ID}, '${obj[i].SUB_DISTRICT_NAME}', ${obj[i].GEO_ID}, ${obj[i].PROVINCE_ID}, ${obj[i].DISTRICT_ID});`)
        //         }
        //         catch (err) {
        //             console.log(i, obj[i].SUB_DISTRICT_ID)
        //             countErr += 1
        //         }
        //     }
        // }
        // console.log()
        // await queryRunner.release()
        // console.log(obj.length, inserts.length)
        // console.log(inserts[4])

        
        // query all insert queries
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        for (let i = 0; i < inserts.length; i++) {
            console.log('query', i)
            await queryRunner.query(inserts[i])
        }
        await queryRunner.release()
        return res.status(200).send({ message: "Migrate is OK"})
    }

    @Post('migrate/zipcode')
    async migrateZipcode(@Res() res: Response) {
        let insert = 
        `INSERT INTO extra.zipcode(
            "ZIPCODE_ID", "ZIPCODE", "PROVINCE_ID", "DISTRICT_ID", "SUB_DISTRICT_ID")
            VALUES `
        const insert_header = insert
        let inserts = []
        const obj = ZIPCODE
        for (let i=0; i < obj.length; i++) {
            let row = `(${obj[i].ZIPCODE_ID}, '${obj[i].ZIPCODE}', ${parseInt(obj[i].PROVINCE_ID)}, ${parseInt(obj[i].DISTRICT_ID)}, ${parseInt(obj[i].SUB_DISTRICT_ID)}),`
            if ((i % 1000 == 0 || i == obj.length - 1) && i != 0) { 
                row = row.slice(0, -1)
                insert += row
                inserts.push(insert)
                insert = insert_header
                console.log(i, obj[i])
            } // remove comma for last row
            else {  insert += row }
        }    
        // query all insert queries
        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        for (let i = 0; i < inserts.length; i++) {
            console.log('query', i)
            await queryRunner.query(inserts[i])
        }
        await queryRunner.release()
        return res.status(200).send({ message: "Migrate is OK"})
    }
    
    @Get('predict/:subdistrict')
    async getPredictFromSubDistrict(@Param('subdistrict') subdis: string, @Res() res) {
        console.log("Param =", subdis)
        const result = await this.extraService.getPredictFromSubDistrict(subdis)
        return res.status(200).send({ data: result })
    }

    @Get('detail/:subdistrict')
    async getDetailFromSubDistrict(@Param('subdistrict') subdis: string, @Res() res) {
        console.log("Param =", subdis)
        const result = await this.extraService.getDetailFromSubDistrict(subdis)
        return res.status(200).send({ data: result })
    }

    @Get('detail/zip/:subdistrict')
    async getDetailFromZipcode(@Param('subdistrict') subdis: number, @Res() res) {
        console.log("Param =", subdis)
        const result = await this.extraService.findZipCodeBySubDistrictID(subdis)
        return res.status(200).send({ data: result })
    }

    @Get('detail/get/province')
    async getProvince(@Res() res) {
        console.log("getProvince")
        const result = await this.extraService.getAllProvince()
        return res.status(200).send({ data: result })
    }

    @Get('detail/get/district/:provinceId')
    async getDistrictByProvince(@Param('provinceId') id:number, @Res() res) {
        const result  = await this.extraService.getDistrictByProvinceId(id)
        return res.status(200).send({ data: result })
    }

    @Get('detail/get/subdistrict/:districtId')
    async getSubDistrictByDistrict(@Param('districtId') id:number, @Res() res) {
        const result  = await this.extraService.getSubDistrictByDistrictId(id)
        return res.status(200).send({ data: result })
    }
}

export interface geoObj {
    GEO_ID: number
    GEO_NAME: string
}
