import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { ExtraController } from './extra/extra.controller';
import { ExtraService } from './extra/extra.service';
import { ExtraModule } from './extra/extra.module';
import { PersonalCarService } from './personal-car/personal-car.service';
import { PersonalCarController } from './personal-car/personal-car.controller';
import { OwnerController } from './owner/owner.controller';
import { OwnerService } from './owner/owner.service';
import { PersonalCarModule } from './personal-car/personal-car.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [AuthModule, UserModule, ExtraModule, PersonalCarModule, OwnerModule],
  controllers: [AppController, ExtraController, PersonalCarController, OwnerController],
  providers: [AppService, ExtraService, PersonalCarService, OwnerService],
})
export class AppModule {}
