import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CarType } from './carType.entity';
import { Owner } from './owner.entity';


@Entity()
export class PersonalCar{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    plateRegisterDate: string

    @Column()
    plateNumber: string

    @Column()
    province: string

    @Column()
    carCategory:string

    @ManyToOne(() => CarType, (carType) => carType.id)
    carType: CarType

    @Column()
    carBrand: string

    @Column()
    carColor: string

    @Column()
    carNumber: string

    @Column()
    carNumberIsOn: string

    @Column()
    carEngineBrand: string

    @Column()
    carEngineNumber: string

    @Column()
    carEngineNumberIsOn: string

    @Column()
    carFuelType: string

    @Column()
    carFuelChassisNumber: string

    @Column()
    carNumberOfPiston: string

    @Column()
    carCC: string

    @Column()
    carHorsePower: string

    @Column()
    carAxle: string

    @Column()
    carWheels: string

    @Column()
    carTire: string

    @Column()
    carWeight: string

    @Column()
    carWeightLoad: string

    @Column()
    carWeightTotal: string

    @Column()
    carSeats: string
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    createdAt: Date;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    updatedAt: Date;
    
    // @ManyToOne(()=> CarType, (carType) => carType.id)
    // CarType: CarType

    @ManyToOne(()=> Owner, (owner) => owner.id)
    owner: Owner

    @ManyToOne(()=> Owner, (owner) => owner.id)
    possessor: Owner
}