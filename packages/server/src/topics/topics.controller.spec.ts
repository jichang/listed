import { Test, TestingModule } from '@nestjs/testing';
import { TopicsController } from './topics.controller';

describe('Topics Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TopicsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TopicsController = module.get<TopicsController>(TopicsController);
    expect(controller).toBeDefined();
  });
});
