import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, JoinColumn } from "typeorm"
import { Geo } from "./xtraGeo.entity"

@Entity({ schema: 'extra' })
export class Province {

    @PrimaryGeneratedColumn()
    PROVINCE_ID: number

    @Column()
    PROVINCE_NAME: string

    @ManyToOne(() => Geo, (geo) => geo.GEO_ID)
    @JoinColumn({name: "GEO_ID"})
    public geo: Geo
}
