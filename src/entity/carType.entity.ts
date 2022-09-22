import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm"
import { AppDataSource } from "../utils/data-source"



@Entity()
export class CarType {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "int4"})
    type: number

    @Column()
    name: string

    @Column({type: "float4", array: true, default: {} })
    lowerBound: number[]

    @Column({type: "float4", array: true, default: {} })
    upperBound: number[]

    @Column({type: "float4", array: true, default: {} })
    priceList: number[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    updatedAt: Date;

    static getAll = () => {
        return AppDataSource.manager.find(CarType, { order: { type: 'ASC' }})
    }

    static getCarType = (type: number) => {
        return AppDataSource.manager.findOneBy(CarType, {
            type: type
        })
    }

    static createNew = (createForm: createForm) => {
        return AppDataSource.manager.insert(CarType, createForm)
    }

    static updateCarType = (updateForm: updateForm) => {
        const { id, ...updateObj } = updateForm
        return AppDataSource.manager.update(CarType, id, updateObj)
    }

    static delete = (carTypeId: number) => {
        return AppDataSource.manager.delete(CarType, carTypeId)
    }
    
}

interface createForm {
    type: number
    name: string
    lowerBound: number[]
    upperBound: number[]
    priceList: number[]
}

interface updateForm {
    id: number
    type?: number
    name?: string
    lowerBound: number[]
    upperBound: number[]
    priceList: number[]
}


