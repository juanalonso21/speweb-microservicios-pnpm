import { Module } from '@nestjs/common';
import { ModuloProductosController } from './modulo-productos.controller';
import { ModuloProductosService } from './modulo-productos.service';

@Module({
  imports: [],
  controllers: [ModuloProductosController],
  providers: [ModuloProductosService],
})
export class ModuloProductosModule {}
