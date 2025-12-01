import { Controller, Get } from '@nestjs/common';
import { ModuloUsuariosService } from './modulo-usuarios.service';

@Controller()
export class ModuloUsuariosController {
  constructor(private readonly moduloUsuariosService: ModuloUsuariosService) {}

  @Get()
  getHello(): string {
    return this.moduloUsuariosService.getHello();
  }
}
