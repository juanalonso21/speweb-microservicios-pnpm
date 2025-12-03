import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductoDto, UpdateProductoDto } from '@speweb/common';
import { Observable } from 'rxjs';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
    ) { }

    @Post()
    create(@Body() createProductoDto: CreateProductoDto) {
        return this.client.send('createProducto', createProductoDto);
    }

    @Get()
    findAll() {
        return this.client.send('findAllProductos', {});
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.client.send('findOneProducto', id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
        return this.client.send('updateProducto', { id, updateProductoDto });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.client.send('removeProducto', id);
    }
}
