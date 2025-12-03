import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(@Inject('PRODUCT_SERVICE') private readonly client: ClientProxy) { }

  async executeSeed() {
    this.logger.log('Starting seed process...');

    const commonSeedPath = path.resolve(__dirname, '../../../../common/seed');
    const categoriasPath = path.join(commonSeedPath, 'categorias.json');
    const productosPath = path.join(commonSeedPath, 'productos.json');

    if (!fs.existsSync(categoriasPath) || !fs.existsSync(productosPath)) {
      this.logger.error(`Seed files not found at ${commonSeedPath}`);
      return { message: 'Seed files not found', success: false };
    }

    const categoriasData = JSON.parse(fs.readFileSync(categoriasPath, 'utf-8'));
    const productosData = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

    this.logger.log('Seeding categories...');
    for (const cat of categoriasData) {
      try {
        // We use createCategoria. Since we don't have upsert endpoint exposed, 
        // we might fail if it exists. Ideally we should check or have upsert.
        // For now, we assume clean DB or handle error.
        await firstValueFrom(this.client.send('createCategoria', cat));
      } catch (e) {
        this.logger.warn(`Failed to create category ${cat.id}: ${e.message}`);
      }
    }

    this.logger.log('Seeding products...');
    for (const prod of productosData) {
      const { categorias, ...productData } = prod;
      try {
        await firstValueFrom(this.client.send('createProducto', {
          ...productData,
          categoriaIds: categorias // Map 'categorias' from JSON to 'categoriaIds' expected by DTO
        }));
      } catch (e) {
        this.logger.warn(`Failed to create product ${prod.id}: ${e.message}`);
      }
    }

    this.logger.log('Seed process completed successfully.');
    return { message: 'Seed executed successfully', success: true };
  }
}
