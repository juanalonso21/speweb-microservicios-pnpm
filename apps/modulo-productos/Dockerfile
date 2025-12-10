FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm
WORKDIR /app
COPY . .
# Filtramos solo para instalar dependencias de este microservicio y sus dependencias (como common)
RUN pnpm install --frozen-lockfile
# Generate Prisma Client
RUN npx prisma generate --schema=apps/modulo-productos/prisma/schema.prisma

RUN pnpm --filter modulo-productos build
RUN pnpm deploy --filter=modulo-productos --prod /deploy/modulo-productos

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nodejs /deploy/modulo-productos/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /deploy/modulo-productos/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /deploy/modulo-productos/node_modules ./node_modules
# Copy schema if needed for runtime checks (optional)
COPY --from=builder /app/apps/modulo-productos/prisma ./prisma

USER nestjs
EXPOSE 3002

CMD ["node", "dist/main"]
