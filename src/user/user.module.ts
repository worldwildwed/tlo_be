import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CheckRole } from '../middleware/checkRole.middleware';
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '../auth/jwt.guard';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {}
// export class UserModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CheckRole)
//       .forRoutes({ path: 'notexist', method: RequestMethod.GET})
//   }
// }
