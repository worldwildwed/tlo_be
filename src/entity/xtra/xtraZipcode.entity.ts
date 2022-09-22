import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, JoinColumn } from "typeorm"
import { District } from "./xtraDistrict.entity"
import { Geo } from "./xtraGeo.entity"
import { Province } from "./xtraProvince.entity"
import { SubDistrict } from "./xtraSubDistrict.entity"

@Entity({ schema: 'extra' })
export class Zipcode {

    @PrimaryGeneratedColumn()
    ZIPCODE_ID: number

    @Column()
    ZIPCODE: string

    @ManyToOne(() => Province, (pro) => pro.PROVINCE_ID)
    @JoinColumn({name: "PROVINCE_ID"})
    public pro: Province

    @ManyToOne(() => District, (dis) => dis.DISTRICT_ID)
    @JoinColumn({name: "DISTRICT_ID"})
    public dis: District

    @ManyToOne(() => SubDistrict, (dis) => dis.SUB_DISTRICT_ID)
    @JoinColumn({name: "SUB_DISTRICT_ID"})
    public subd: District
}
