import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
    const categoriasPath = path.join(__dirname, '../../../../common/seed/categorias.json');
    const productosPath = path.join(__dirname, '../../../../common/seed/productos.json');

    const categoriasData = JSON.parse(fs.readFileSync(categoriasPath, 'utf-8'));
    const productosData = JSON.parse(fs.readFileSync(productosPath, 'utf-8'));

    console.log('Seeding categories...');
    for (const cat of categoriasData) {
        await prisma.categoria.upsert({
            where: { id: cat.id },
            update: {},
            create: {
                id: cat.id,
                name: cat.name,
                description: cat.description,
                createdAt: cat.createdAt,
                direccionImagen: cat.direccionImagen,
            },
        });
    }

    console.log('Seeding products...');
    for (const prod of productosData) {
        const { categorias, ...productData } = prod;
        await prisma.producto.upsert({
            where: { id: prod.id },
            update: {},
            create: {
                ...productData,
                categorias: {
                    connect: categorias.map((id: string) => ({ id })),
                },
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
