import { Test, TestingModule } from '@nestjs/testing';
import { ConclusionsService } from './conclusions.service';

describe('ConclusionsService', () => {
  let service: ConclusionsService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConclusionsService],
    }).compile();
    service = module.get<ConclusionsService>(ConclusionsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
