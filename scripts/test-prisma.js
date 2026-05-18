(async ()=>{
  try{
    require('dotenv').config();
    const { PrismaClient } = require('../dist/src/common/prisma/generated/prisma/client');
    const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
    const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) });
    const res = await p.$queryRaw`SELECT 1 as ok`;
    console.log('OK', res);
    await p.$disconnect();
  } catch (e) {
    console.error('ERR', e);
    process.exit(1);
  }
})();
