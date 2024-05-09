import { Test, TestingModule } from '@nestjs/testing';
import { DancingController } from './dancing.controller';

describe('DancingController', () => {
  let controller: DancingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DancingController],
    }).compile();

    controller = module.get<DancingController>(DancingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
