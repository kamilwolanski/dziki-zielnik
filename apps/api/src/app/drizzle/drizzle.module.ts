import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DRIZZLE_DB, createDb, type DB } from '@dziki-zielnik/database';

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
