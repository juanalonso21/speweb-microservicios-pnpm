import { IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(50)
  description: string;

  @IsNumber()
  precio: number;

  @IsString()
  @MaxLength(100)
  direccionImagen: string;

  @IsOptional()
  categoriaIds?: string[];
}
