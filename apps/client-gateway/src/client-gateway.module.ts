import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientGatewayController } from './client-gateway.controller';
import { SeedController } from './seed/seed.controller';
import { ClientGatewayService } from './client-gateway.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    ClientsModule.register([
      {
        name: 'SEED_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [ClientGatewayController, SeedController],
  providers: [ClientGatewayService],
})
export class ClientGatewayModule { }
