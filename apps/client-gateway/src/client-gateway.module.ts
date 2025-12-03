import { Module } from '@nestjs/common';
import { ClientGatewayController } from './client-gateway.controller';
import { ClientGatewayService } from './client-gateway.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [ClientGatewayController],
  providers: [ClientGatewayService],
})
export class ClientGatewayModule { }
