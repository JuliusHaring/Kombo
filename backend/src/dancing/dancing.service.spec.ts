import { Test, TestingModule } from '@nestjs/testing';
import { DancingService } from './dancing.service';

describe('DancingService', () => {
  let service: DancingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DancingService],
    }).compile();

    service = module.get<DancingService>(DancingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
