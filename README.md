# Authentication
| Description            | HTTP Method | End Point              |
|------------------------|-------------|------------------------|
| Create User            | POST        | /users                 |
| User Login             | POST        | /users/login           |
| Get All Users          | GET         | /users                 |
| Get User by ID         | GET         | /users/:id             |
| Get Users by Role      | GET         | /users/role/:role      |
| Update User            | PATCH       | /users/:id             |
| Update Role of User    | PATCH       | /users/role/:id        |
| Delete User            | DELETE      | /users/:id             |


## Clone
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

