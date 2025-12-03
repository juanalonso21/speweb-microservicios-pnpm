import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';

import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SeedModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3003,
    },
  });
  await app.listen();
}
bootstrap();
