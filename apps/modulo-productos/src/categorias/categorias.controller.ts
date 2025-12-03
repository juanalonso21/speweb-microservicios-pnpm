import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto, UpdateCategoriaDto } from '@speweb/common';

@Controller()
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) { }

  @MessagePattern('createCategoria')
  create(@Payload() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @MessagePattern('findAllCategorias')
  findAll() {
    return this.categoriasService.findAll();
  }

  @MessagePattern('findOneCategoria')
  findOne(@Payload() id: string) {
    return this.categoriasService.findOne(id);
  }

  @MessagePattern('updateCategoria')
  update(@Payload() payload: { id: string; updateCategoriaDto: UpdateCategoriaDto }) {
    return this.categoriasService.update(payload.id, payload.updateCategoriaDto);
  }

  @MessagePattern('removeCategoria')
  remove(@Payload() id: string) {
    return this.categoriasService.remove(id);
  }
}
