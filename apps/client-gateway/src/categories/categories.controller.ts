import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCategoriaDto, UpdateCategoriaDto } from '@speweb/common';

@Controller('categories')
export class CategoriesController {
  constructor(@Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoriaDto) {
    return this.client.send('createCategoria', createCategoryDto);
  }

  @Get()
  findAll() {
    return this.client.send('findAllCategorias', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneCategoria', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoriaDto) {
    return this.client.send('updateCategoria', { id, updateCategoryDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeCategoria', id);
  }
}
