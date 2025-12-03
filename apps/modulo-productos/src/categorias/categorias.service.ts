import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto, UpdateCategoriaDto } from '@speweb/common';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      return await this.prisma.categoria.create({
        data: createCategoriaDto,
      });
    } catch (error) {
      throw new BadRequestException('Error al crear la categoría');
    }
  }

  async findAll() {
    return await this.prisma.categoria.findMany({
      include: { productos: true },
    });
  }

  async findOne(id: string) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      include: { productos: true },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }

    return categoria;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      return await this.prisma.categoria.update({
        where: { id },
        data: updateCategoriaDto,
      });
    } catch (error) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.categoria.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
  }
}
