import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()


// prisma setup
/*
1. install prisma devdep
2. prisma init
3. load env prisma.config.ts env.config()
4. schema theke output directory remove
5. prisma-client convert to prisma-client-js
6. change the database url
7. prisma migrate dev


*/