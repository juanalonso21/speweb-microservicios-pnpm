import { NestFactory } from '@nestjs/core';
import { TestAppPnpmModule } from './test-app-pnpm.module';

async function bootstrap() {
  const app = await NestFactory.create(TestAppPnpmModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
