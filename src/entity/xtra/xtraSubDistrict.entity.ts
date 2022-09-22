import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, JoinColumn } from "typeorm"
import { District } from "./xtraDistrict.entity"
import { Geo } from "./xtraGeo.entity"
import { Province } from "./xtraProvince.entity"

@Entity({ schema: 'extra' })
export class SubDistrict {

    @PrimaryGeneratedColumn()
    SUB_DISTRICT_ID: number

    @Column()
    SUB_DISTRICT_NAME: string

    @ManyToOne(() => Geo, (geo) => geo.GEO_ID)
    @JoinColumn({name: "GEO_ID"})
    public geo: Geo

    @ManyToOne(() => Province, (pro) => pro.PROVINCE_ID)
    @JoinColumn({name: "PROVINCE_ID"})
    public pro: Province

    @ManyToOne(() => District, (dis) => dis.DISTRICT_ID)
    @JoinColumn({name: "DISTRICT_ID"})
    public dis: District
}
