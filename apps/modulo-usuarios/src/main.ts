import { NestFactory } from '@nestjs/core';
import { ModuloUsuariosModule } from './modulo-usuarios.module';

async function bootstrap() {
  const app = await NestFactory.create(ModuloUsuariosModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
