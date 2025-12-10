import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ModuloProductosModule } from './modulo-productos.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ModuloProductosModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: process.env.port ? parseInt(process.env.port) : 3002,
    },
  });
  await app.listen();
}
bootstrap();
