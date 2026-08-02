ARG NODE_IMAGE=node:24.18.0-bookworm-slim

FROM ${NODE_IMAGE} AS build
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10.34.0 --activate
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json tsconfig.base.json ./
COPY apps/worker/package.json apps/worker/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/observability/package.json packages/observability/package.json
RUN pnpm install --frozen-lockfile
COPY apps/worker apps/worker
COPY packages/config packages/config
COPY packages/contracts packages/contracts
COPY packages/observability packages/observability
RUN pnpm --filter @cpos/worker... build
RUN pnpm --filter @cpos/worker deploy --prod --legacy /out/worker

FROM ${NODE_IMAGE} AS runtime
ARG BUILD_ID=unreleased
ARG RELEASE_ID=unreleased
ARG SOURCE_COMMIT=unknown
LABEL org.opencontainers.image.title="cpos-worker" \
      org.opencontainers.image.version="${RELEASE_ID}" \
      org.opencontainers.image.revision="${SOURCE_COMMIT}" \
      cpos.build.id="${BUILD_ID}"
ENV NODE_ENV=production \
    APP_ENV=container \
    BUILD_ID=${BUILD_ID} \
    RELEASE_ID=${RELEASE_ID} \
    SOURCE_COMMIT=${SOURCE_COMMIT}
RUN groupadd --gid 10001 cpos && useradd --uid 10001 --gid cpos --no-create-home --shell /usr/sbin/nologin cpos
WORKDIR /app
COPY --from=build --chown=10001:10001 /out/worker/ ./
USER 10001:10001
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD ["node", "dist/main.js", "--check"]
CMD ["node", "dist/main.js"]
