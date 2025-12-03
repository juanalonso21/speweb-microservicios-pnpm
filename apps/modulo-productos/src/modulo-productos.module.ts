import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ProductosModule,
  ],
  controllers: [],
  providers: [],
})
export class ModuloProductosModule { }
