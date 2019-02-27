import { Test, TestingModule } from '@nestjs/testing';
import { ProofsController } from './proofs.controller';

describe('Proofs Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ProofsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ProofsController = module.get<ProofsController>(ProofsController);
    expect(controller).toBeDefined();
  });
});
