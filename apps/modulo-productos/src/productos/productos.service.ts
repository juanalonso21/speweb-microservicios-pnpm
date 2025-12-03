import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductoDto, UpdateProductoDto } from '@speweb/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProductoDto: CreateProductoDto) {
    try {
      const { categoriaIds, ...productData } = createProductoDto;

      return await this.prisma.producto.create({
        data: {
          ...productData,
          precio: productData.precio,
          categorias: categoriaIds && categoriaIds.length > 0 ? {
            connect: categoriaIds.map(id => ({ id })),
          } : undefined,
        },
        include: { categorias: true },
      });
    } catch (error) {
      throw new BadRequestException('Error al crear el producto');
    }
  }

  async findAll() {
    return this.prisma.producto.findMany({
      include: {
        categorias: true,
      },
    });
  }

  async findOne(id: string) {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: { categorias: true },
    });

    if (!producto) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return producto;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    try {
      const { categoriaIds, ...productData } = updateProductoDto;

      return await this.prisma.producto.update({
        where: { id },
        data: {
          ...productData,
          categorias: categoriaIds ? {
            set: categoriaIds.map(id => ({ id })),
          } : undefined,
        },
        include: { categorias: true },
      });
    } catch (error) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.producto.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
  }
}
