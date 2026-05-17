import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../common/prisma/generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { envConfig } from '../configs/env.config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ adapter: new PrismaMariaDb(envConfig.DATABASE_URL) });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
