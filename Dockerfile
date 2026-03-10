FROM node:20-alpine AS builder

# better-sqlite3 requires native compilation
RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY tsconfig.json drizzle.config.ts config.ts ./
COPY src ./src
COPY adapters ./adapters
RUN npm run build

# ---- runner ----
FROM node:20-alpine AS runner

WORKDIR /app
COPY package*.json ./
# Copy pre-compiled node_modules (including native better-sqlite3 built for alpine)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

VOLUME ["/app/data"]
ENV NODE_ENV=production

CMD ["node", "dist/src/app/bot/index.js"]
