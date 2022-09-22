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

@Module({
  imports: [AuthModule, UserModule, ExtraModule],
  controllers: [AppController, ExtraController],
  providers: [AppService, ExtraService],
})
export class AppModule {}
