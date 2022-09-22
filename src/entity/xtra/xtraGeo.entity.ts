import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm"
import { AppDataSource } from "../../utils/data-source"

@Entity({ schema: 'extra' })
export class Geo {

    @PrimaryGeneratedColumn()
    GEO_ID: number

    @Column()
    GEO_NAME: string

    static getGeo = (index: number) => {
        return AppDataSource.manager.findOne(Geo, {where: {GEO_ID: index}})
    }
}
