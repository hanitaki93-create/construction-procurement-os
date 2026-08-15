#!/bin/sh
set -eu

: "${DATABASE_URL:?DATABASE_URL is required for the Architecture V2 preview}"

API_PORT="${CPOS_PREVIEW_API_PORT:-43117}"
WEB_PORT="${CPOS_PREVIEW_WEB_PORT:-43118}"
API_LOG=/tmp/cpos-v2-preview-api.log

APP_ENV=development \
CPOS_DEMO_MODE=false \
DATABASE_URL="${DATABASE_URL}" \
HOST=127.0.0.1 \
PORT="${API_PORT}" \
LOG_LEVEL="${LOG_LEVEL:-info}" \
node /app/apps/api/dist/main.js >"${API_LOG}" 2>&1 &
API_PID=$!

cleanup() {
  kill "${API_PID}" 2>/dev/null || true
  wait "${API_PID}" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

ready=false
attempt=1
while [ "${attempt}" -le 45 ]; do
  if node -e "fetch('http://127.0.0.1:${API_PORT}/health/live').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"; then
    ready=true
    break
  fi
  sleep 1
  attempt=$((attempt + 1))
done

if [ "${ready}" != "true" ]; then
  cat "${API_LOG}" || true
  exit 1
fi

CPOS_PREVIEW_API_ORIGIN="http://127.0.0.1:${API_PORT}" \
CPOS_PREVIEW_WEB_PORT="${WEB_PORT}" \
node /app/deploy/v2-preview/serve.mjs
