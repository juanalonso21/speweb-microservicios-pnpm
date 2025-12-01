import { Module } from '@nestjs/common';
import { ModuloUsuariosController } from './modulo-usuarios.controller';
import { ModuloUsuariosService } from './modulo-usuarios.service';

@Module({
  imports: [],
  controllers: [ModuloUsuariosController],
  providers: [ModuloUsuariosService],
})
export class ModuloUsuariosModule {}
