npm i --prefix porfo-ui
npm run build --prefix porfo-ui
docker build --tag porfo-ui ./porfo-ui
docker compose -f docker-compose-win.yml -p porfo --env-file .env.pro up -d