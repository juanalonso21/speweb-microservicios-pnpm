# Prisma Integration Guide

This guide documents the integration of Prisma ORM into the `modulo-productos` microservice.

## Overview

Prisma is used as the ORM (Object-Relational Mapper) to interact with the PostgreSQL database. It replaces TypeORM in this module.

## Prerequisites

- Node.js installed.
- PostgreSQL database running.
- `pnpm` installed.
- **VS Code Extension**: It is highly recommended to install the [Prisma VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) for syntax highlighting and formatting.

## Setup & Configuration

### 1. Installation

Prisma dependencies are installed in `apps/modulo-productos`:

```bash
pnpm --filter modulo-productos add -D prisma
pnpm --filter modulo-productos add @prisma/client
```

### 2. Schema Definition

The database schema is defined in `apps/modulo-productos/prisma/schema.prisma`.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Producto {
  id              String      @id @default(uuid())
  name            String
  description     String
  createdAt       DateTime    @default(now())
  precio          Decimal     @db.Decimal(10, 2)
  direccionImagen String
  categorias      Categoria[]
}

model Categoria {
  id              String      @id @default(uuid())
  name            String
  description     String
  createdAt       DateTime    @default(now())
  direccionImagen String
  productos       Producto[]
}
```

### 3. Environment Variables

Prisma requires a `DATABASE_URL` environment variable. This is configured in `apps/modulo-productos/.env`.

```env
DB_HOST=31.220.93.25
DB_PORT=5437
DB_USER=usuario
DB_PASS=password
DB_NAME=speweb_db
DATABASE_URL="postgresql://usuario:password@31.220.93.25:5437/speweb_db?schema=public"
```

## NestJS Integration

### PrismaService

A `PrismaService` is created in `src/prisma/prisma.service.ts` to manage the database connection. It extends `PrismaClient` and implements `OnModuleInit` and `OnModuleDestroy`.

It is configured to construct the connection string dynamically from `ConfigService` if needed, or use the `DATABASE_URL` from the environment.

### PrismaModule

The `PrismaModule` (`src/prisma/prisma.module.ts`) exports `PrismaService` and is marked as `@Global()`, so it can be imported once in the root module and used everywhere.

## Common Commands

Run these commands from `apps/modulo-productos` or using `pnpm --filter modulo-productos exec ...`.

### Generate Prisma Client

Generates the TypeScript client based on your schema. **Run this after every schema change.**

```bash
npx prisma generate
```

### Push Schema to Database

Updates the database schema to match your Prisma schema. Useful for prototyping.

```bash
npx prisma db push
```

### Format Schema

Formats the `schema.prisma` file.

```bash
npx prisma format
```

### Visualize Database

Opens Prisma Studio, a GUI to view and edit data.

```bash
npx prisma studio
```

## Troubleshooting

### `prisma generate` fails with `[Context: getConfig]`

If you encounter an error like `Error: [Context: getConfig]` when running `prisma generate`:

1.  **Check Environment Variables**: Ensure `DATABASE_URL` is correctly set in your `.env` file or environment.
2.  **Manual Generation**: Try running the command explicitly with the variable:
    ```bash
    # Windows PowerShell
    $env:DATABASE_URL="postgresql://..."; npx prisma generate
    
    # Bash
    DATABASE_URL="postgresql://..." npx prisma generate
    ```
3.  **Reinstall Dependencies**: Sometimes `node_modules` can get in a bad state.
    ```bash
    rm -rf node_modules
    pnpm install
    ```
