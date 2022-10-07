import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PersonalCar } from './personalCar.entity';

@Entity()
export class Owner {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({length:13})
    idCard: string

    @Column()
    dateOfBirth: string

    @Column()
    address: string

    @Column({ nullable: true, default: '' })
    moo: string

    @Column({ nullable: true, default: '' })
    soi: string

    @Column({ nullable: true, default: '' })
    road: string

    @Column({ nullable: true, default: '' })
    subDistrict: string

    @Column()
    district: string

    @Column()
    province: string

    @Column()
    zipCode: string

    @Column()
    phone: string

    @OneToMany(()=> PersonalCar, (personalCar) => personalCar.id)
    personalCar: PersonalCar[]
}