# Guía de Flujo de Trabajo del Monorepo

Este documento explica cómo trabajar con el monorepo, incluyendo cómo crear nuevas aplicaciones y librerías, y cómo gestionar dependencias.

## Estructura del Proyecto

El proyecto es un monorepo gestionado por `pnpm` y `NestJS`.
- **apps/**: Contiene las aplicaciones (microservicios, gateways, etc.).
- **libs/**: Contiene librerías compartidas.

## Crear Nuevas Sub-aplicaciones

Para crear una nueva aplicación dentro del monorepo, utiliza el script de automatización. Esto asegura que el archivo `package.json` se cree y configure correctamente para el workspace.

```bash
# Modo interactivo
pnpm create:app

# Modo no interactivo
pnpm create:app <nombre-de-la-app>
```

Este script se encargará de:
1. Generar la aplicación NestJS usando `nest g app`.
2. Crear el archivo `package.json` necesario.
3. Instalar las dependencias para vincular el nuevo paquete en el workspace.

## Crear Nuevas Librerías

Para crear una librería compartida:

```bash
nest g lib <nombre-de-la-lib>
```

**Ejemplo:**
```bash
nest g lib auth
```
Esto creará `libs/auth` y configurará los alias de TypeScript para que puedas importarla en tus apps como `@app/auth` (o el prefijo que esté configurado).

## Gestión de Dependencias

### Instalación Interactiva (Recomendado)

Hemos creado un script para facilitar la instalación de dependencias en módulos específicos.

Ejecuta:
```bash
npm run add:dep
# o
pnpm add:dep
```

El script te guiará paso a paso:
1.  Selecciona el módulo (app o lib) donde quieres instalar la dependencia.
2.  Escribe el nombre del paquete (ej: `axios`, `lodash`).
3.  Elige el tipo de dependencia (`prod`, `dev`, `peer`).

### Instalación Manual con PNPM

Si prefieres hacerlo manualmente, usa el flag `--filter` de pnpm.

**Instalar en una app específica:**
```bash
pnpm add <paquete> --filter <nombre-de-la-app>
```

**Ejemplo:**
```bash
pnpm add axios --filter client-gateway
```

**Instalar en la raíz (para herramientas globales del repo):**
```bash
pnpm add -w <paquete>
```
