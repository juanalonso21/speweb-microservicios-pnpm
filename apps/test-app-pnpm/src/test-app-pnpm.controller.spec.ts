import { Test, TestingModule } from '@nestjs/testing';
import { TestAppPnpmController } from './test-app-pnpm.controller';
import { TestAppPnpmService } from './test-app-pnpm.service';

describe('TestAppPnpmController', () => {
  let testAppPnpmController: TestAppPnpmController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestAppPnpmController],
      providers: [TestAppPnpmService],
    }).compile();

    testAppPnpmController = app.get<TestAppPnpmController>(TestAppPnpmController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(testAppPnpmController.getHello()).toBe('Hello World!');
    });
  });
});
