import { Test, TestingModule } from '@nestjs/testing';
import { SmailService } from './smail.service';

describe('SmailService', () => {
  let service: SmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmailService],
    }).compile();

    service = module.get<SmailService>(SmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
