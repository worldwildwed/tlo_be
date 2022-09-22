import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from "./utils/data-source"
import { User } from "./entity/user.entity"
import { getRepository } from "typeorm"
import { CarType } from './entity/carType.entity';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

AppDataSource.initialize().then(async () => {
  console.log(await CarType.getAll())


  console.log("PG connected...")

}).catch(error => console.log(error))

console.log('finish...')
