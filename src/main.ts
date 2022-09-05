import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { getRepository } from "typeorm"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

AppDataSource.initialize().then(async () => {

  console.log("Inserting a new user into the database...")
  const user = new User()
  const userRepo = await AppDataSource.getRepository(User)

  const users = await AppDataSource.manager.find(User)
  console.log("Loaded Last users: ", users[users.length-1])

  console.log("PG connected...")

}).catch(error => console.log(error))
