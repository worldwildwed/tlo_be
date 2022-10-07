import { Test, TestingModule } from '@nestjs/testing';
import { PersonalCarService } from './personal-car.service';

describe('PersonalCarService', () => {
  let service: PersonalCarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalCarService],
    }).compile();

    service = module.get<PersonalCarService>(PersonalCarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
