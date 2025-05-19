rm -rf node_modules .deno .vite .cache package-lock.json deno.lock
cd client
rm -rf node_modules .deno .vite .cache package-lock.json deno.lock
cd ..
cd server
rm -rf node_modules .deno .vite .cache package-lock.json deno.lock
cd ..
docker compose down
docker compose up --build
