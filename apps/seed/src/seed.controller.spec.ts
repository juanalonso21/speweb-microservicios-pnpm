import { Test, TestingModule } from '@nestjs/testing';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

describe('SeedController', () => {
  let seedController: SeedController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SeedController],
      providers: [SeedService],
    }).compile();

    seedController = app.get<SeedController>(SeedController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(seedController.getHello()).toBe('Hello World!');
    });
  });
});
