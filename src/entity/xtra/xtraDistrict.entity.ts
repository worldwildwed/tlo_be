import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, JoinColumn } from "typeorm"
import { Geo } from "./xtraGeo.entity"
import { Province } from "./xtraProvince.entity"

@Entity({ schema: 'extra' })
export class District {

    @PrimaryGeneratedColumn()
    DISTRICT_ID: number

    @Column()
    DISTRICT_NAME: string

    @ManyToOne(() => Geo, (geo) => geo.GEO_ID)
    @JoinColumn({name: "GEO_ID"})
    public geo: Geo

    @ManyToOne(() => Province, (pro) => pro.PROVINCE_ID)
    @JoinColumn({name: "PROVINCE_ID"})
    public pro: Province
}
