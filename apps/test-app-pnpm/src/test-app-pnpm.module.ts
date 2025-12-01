import { Module } from '@nestjs/common';
import { TestAppPnpmController } from './test-app-pnpm.controller';
import { TestAppPnpmService } from './test-app-pnpm.service';

@Module({
  imports: [],
  controllers: [TestAppPnpmController],
  providers: [TestAppPnpmService],
})
export class TestAppPnpmModule {}
