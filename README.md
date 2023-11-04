# Authentication

```
git clone https://github.com/yudhaginongpratidina/Authentication.git
cd Authentication
npm install
```
```
npm run start (production)
npm run dev (development)
```

## Setup Database
```
DATABASE_URL="databaseType://username@hostname:port/databaseName"
```
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```
## Migrate
```
npx prisma migrate
```