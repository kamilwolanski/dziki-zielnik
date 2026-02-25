import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDb, type DB } from '@dziki-zielnik/data-access';

export const DRIZZLE_DB = Symbol('DRIZZLE_DB');

@Module({
  providers: [
    {
      provide: DRIZZLE_DB,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<DB> => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (!databaseUrl) {
          throw new Error('DATABASE_URL is not defined');
        }
        
        return createDb(databaseUrl);
      },
    },
  ],
  exports: [DRIZZLE_DB],
})
export class DrizzleModule {}
