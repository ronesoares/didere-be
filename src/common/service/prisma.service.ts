import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient as AdminPrismaClient } from '@prisma/client/admin';
import { PrismaClient as FilesPrismaClient } from '@prisma/client/files';
import { PrismaClient as DidereClient } from '@prisma/client/didere';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public admin: AdminPrismaClient;
  public files: FilesPrismaClient;
  public didere: DidereClient;

  constructor() {
    this.admin = new AdminPrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_ADMIN_URL,
        },
      },
    });

    this.files = new FilesPrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_FILES_URL,
        },
      },
    });

    this.didere = new DidereClient({
      datasources: {
        db: {
          url: process.env.DATABASE_DIDERE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.admin.$connect();
    await this.files.$connect();
    await this.didere.$connect();
  }

  async onModuleDestroy() {
    await this.admin.$disconnect();
    await this.files.$disconnect();
    await this.didere.$disconnect();
  }

  // Método para transações no banco didere
  async $transaction<T>(fn: (prisma: DidereClient) => Promise<T>): Promise<T> {
    return this.didere.$transaction(fn);
  }
}