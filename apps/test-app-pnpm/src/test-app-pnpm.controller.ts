import { Controller, Get } from '@nestjs/common';
import { TestAppPnpmService } from './test-app-pnpm.service';

@Controller()
export class TestAppPnpmController {
  constructor(private readonly testAppPnpmService: TestAppPnpmService) {}

  @Get()
  getHello(): string {
    return this.testAppPnpmService.getHello();
  }
}
