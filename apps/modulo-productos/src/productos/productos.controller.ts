import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from '@speweb/common';
import { UpdateProductoDto } from '@speweb/common';

@Controller()
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  // @MessagePattern('createProducto')
  // create(@Payload() createProductoDto: CreateProductoDto) {
  //   return this.productosService.create(createProductoDto);
  // }

  @MessagePattern('findAllProductos')
  findAll() {
    return this.productosService.findAll();
  }

//   @MessagePattern('findOneProducto')
//   findOne(@Payload() id: string) {
//     return this.productosService.findOne(id);
//   }

//   @MessagePattern('updateProducto')
//   update(@Payload() payload: { id: string; updateProductoDto: UpdateProductoDto }) {
//     return this.productosService.update(payload.id, payload.updateProductoDto);
//   }

//   @MessagePattern('removeProducto')
//   remove(@Payload() id: string) {
//     return this.productosService.remove(id);
//   }
 }
