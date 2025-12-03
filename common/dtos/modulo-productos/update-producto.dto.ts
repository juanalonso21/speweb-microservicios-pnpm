import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from 'common/dtos/modulo-productos/create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
