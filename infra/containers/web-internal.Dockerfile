ARG NODE_IMAGE=node:24.18.0-bookworm-slim

FROM ${NODE_IMAGE} AS build
WORKDIR /workspace
RUN corepack enable && corepack prepare pnpm@10.34.0 --activate
COPY .npmrc package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json tsconfig.base.json ./
COPY apps/web-internal/package.json apps/web-internal/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/ui-foundation/package.json packages/ui-foundation/package.json
RUN pnpm install --frozen-lockfile
COPY apps/web-internal apps/web-internal
COPY packages/contracts packages/contracts
COPY packages/ui-foundation packages/ui-foundation
RUN pnpm --filter @cpos/web-internal... build

FROM ${NODE_IMAGE} AS runtime
ARG BUILD_ID=unreleased
ARG RELEASE_ID=unreleased
ARG SOURCE_COMMIT=unknown
LABEL org.opencontainers.image.title="cpos-web-internal" \
      org.opencontainers.image.version="${RELEASE_ID}" \
      org.opencontainers.image.revision="${SOURCE_COMMIT}" \
      cpos.build.id="${BUILD_ID}"
ENV NODE_ENV=production PORT=8080
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /opt/yarn-v1.22.22 \
    && rm -f /usr/local/bin/npm \
             /usr/local/bin/npx \
             /usr/local/bin/corepack \
             /usr/local/bin/pnpm \
             /usr/local/bin/pnpx \
             /usr/local/bin/yarn \
             /usr/local/bin/yarnpkg \
    && groupadd --gid 10001 cpos \
    && useradd --uid 10001 --gid cpos --no-create-home --shell /usr/sbin/nologin cpos
COPY --chown=10001:10001 infra/containers/static-server.mjs /app/static-server.mjs
COPY --from=build --chown=10001:10001 /workspace/apps/web-internal/dist/ /srv/site/
WORKDIR /app
USER 10001:10001
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:8080/health/live').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
CMD ["node", "static-server.mjs"]
