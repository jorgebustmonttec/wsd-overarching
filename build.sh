rm -rf node_modules .deno .vite .cache package-lock.json deno.lock
docker compose down
docker compose up --build
