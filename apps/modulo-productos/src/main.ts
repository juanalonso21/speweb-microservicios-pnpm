import { NestFactory } from '@nestjs/core';
import { ModuloProductosModule } from './modulo-productos.module';

async function bootstrap() {
  const app = await NestFactory.create(ModuloProductosModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
