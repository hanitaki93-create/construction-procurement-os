FROM node:24.18.0-bookworm-slim

WORKDIR /app

RUN corepack enable \
  && corepack prepare pnpm@10.34.0 --activate

COPY . .

RUN pnpm install --frozen-lockfile \
  && pnpm --filter @cpos/database-core build \
  && pnpm --filter @cpos/api build \
  && pnpm --filter @cpos/ui-foundation build \
  && pnpm --filter @cpos/web-internal build

ENV APP_ENV=development \
    LOG_LEVEL=info

EXPOSE 43118

CMD ["sh", "deploy/v2-preview/entrypoint.sh"]
