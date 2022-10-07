import { Module } from '@nestjs/common';
import { OwnerService } from '../owner/owner.service';
import { PersonalCarController } from './personal-car.controller';
import { PersonalCarService } from './personal-car.service';

@Module({
    controllers: [PersonalCarController],
    providers: [PersonalCarService,OwnerService],
    exports: [PersonalCarService],
})
export class PersonalCarModule {}
