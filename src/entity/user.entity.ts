import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Agent } from "./agent.entity"



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

    @Column({ nullable: true, default: '' })
    phone: string

    @Column({ nullable: true, default: '' })
    email: string

    // @Column({ nullable: true })
    // bankacc: string

    @Column({ nullable: true, default: ''  })
    firstName: string

    @Column({ nullable: true, default: ''  })
    lastName: string

    @ManyToOne(() => Agent, (agent) => agent.id)
    agent: Agent

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
    updatedAt: Date;


}

