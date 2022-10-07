import { Test, TestingModule } from '@nestjs/testing';
import { PersonalCarController } from './personal-car.controller';

describe('PersonalCarController', () => {
  let controller: PersonalCarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalCarController],
    }).compile();

    controller = module.get<PersonalCarController>(PersonalCarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
