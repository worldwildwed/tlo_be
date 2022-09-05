import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm"



@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 0 })
    role: number

    @Column({ unique: true })
    username: string

    @Column()
    hash: string

    @Column()
    password: string

    @Column()
    phone: string

    @Column({ nullable: true })
    email: string

    @Column({ nullable: true })
    bankacc: string

    @Column({ nullable: true })
    firstName: string

    @Column({ nullable: true })
    lastName: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    updatedAt: Date;

    
}
