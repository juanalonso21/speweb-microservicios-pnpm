import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ProductosModule,
    CategoriasModule,
  ],
  controllers: [],
  providers: [],
})
export class ModuloProductosModule { }
