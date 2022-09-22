require('dotenv').config()

import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/user.entity"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    // entities: [ User ],
    // entities: [__dirname + "/src/entity/*.entity{.ts, .js}" ],
    // entities: [__dirname + "/../**/*.entity{.ts, .js}"],
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [],
    subscribers: [],
})
