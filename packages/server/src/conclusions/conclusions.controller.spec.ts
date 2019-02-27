import { Test, TestingModule } from '@nestjs/testing';
import { ConclusionsController } from './conclusions.controller';

describe('Conclusions Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ConclusionsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ConclusionsController = module.get<ConclusionsController>(ConclusionsController);
    expect(controller).toBeDefined();
  });
});
