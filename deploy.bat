call npm run deploy --prefix porfo-ui
call docker build --tag porfo-ui ./porfo-ui
call docker compose -f docker-compose-win.yml -p porfo --env-file .env.pro up -d