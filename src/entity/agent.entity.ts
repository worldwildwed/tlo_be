import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm"

@Entity()
export class Agent {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    detail: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    updatedAt: Date;

    
}
