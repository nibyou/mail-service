import { Test, TestingModule } from '@nestjs/testing';
import { SmailController } from './smail.controller';
import { SmailService } from './smail.service';

describe('SmailController', () => {
  let controller: SmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmailController],
      providers: [SmailService],
    }).compile();

    controller = module.get<SmailController>(SmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
