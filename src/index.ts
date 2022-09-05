// // import { AppDataSource } from "./data-source"
// // import { User } from "./entity/User"

// // AppDataSource.initialize().then(async () => {

// //     console.log("Inserting a new user into the database...")
// //     const user = new User()
// //     user.firstName = "Timber"
// //     user.lastName = "Saw"
// //     // user.age = 25
// //     await AppDataSource.manager.save(user)
// //     console.log("Saved a new user with id: " + user.id)

// //     console.log("Loading users from the database...")
// //     const users = await AppDataSource.manager.find(User)
// //     console.log("Loaded users: ", users)

// //     console.log("Here you can setup and run express / fastify / any other framework.")

// // }).catch(error => console.log(error))

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"
// import { getRepository } from "typeorm"

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

// AppDataSource.initialize().then(async () => {

//   // console.log("Inserting a new user into the database...")
//   const user = new User()
//   const userRepo = await AppDataSource.getRepository(User)
 
//   // user.firstName = "Timber"
//   // user.lastName = "Saw"
//   // user.age = 25
//   // await AppDataSource.manager.save(user)
//   // console.log("Saved a new user with id: " + user.id)

//   console.log("Loading users from the database...")
//   const users = await AppDataSource.manager.find(User)
//   console.log("Loaded users: ", users)

//   console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
