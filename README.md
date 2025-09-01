## Rock Guidebook

```bash
docker compose up -d
docker compose exec web npx prisma generate
docker compose exec web npx prisma db seed    
npm run dev
```