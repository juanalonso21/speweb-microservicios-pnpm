import { Controller, Get } from '@nestjs/common';
import { ModuloProductosService } from './modulo-productos.service';

@Controller()
export class ModuloProductosController {
  constructor(private readonly moduloProductosService: ModuloProductosService) {}

  @Get()
  getHello(): string {
    return this.moduloProductosService.getHello();
  }
}
