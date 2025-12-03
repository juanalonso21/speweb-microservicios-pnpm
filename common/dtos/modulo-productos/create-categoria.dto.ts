import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(50)
  description: string;

  @IsString()
  @MaxLength(100)
  direccionImagen: string;

  @IsOptional()
  productoIds?: string[];
}
