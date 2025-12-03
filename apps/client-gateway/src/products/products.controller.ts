import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
    ) { }

    @Get()
    findAll(): any {
        return this.client.send('findAllProductos' , {});
    }
}
