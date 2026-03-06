import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_DB } from '@dziki-zielnik/database';
import type { DB } from '@dziki-zielnik/database';
import { refreshTokensTable } from '@dziki-zielnik/database';

@Injectable()
export class RefreshTokensRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DB) {}

  findOne(refreshToken: string) {
    return this.db.query.refreshTokensTable.findFirst({
      where: (tokenEntity, { eq }) => eq(tokenEntity.token, refreshToken),
    });
  }

  async delete(token: string) {
    await this.db
      .delete(refreshTokensTable)
      .where(eq(refreshTokensTable.token, token));
  }

  async deleteAllForUser(userId: string) {
    await this.db
      .delete(refreshTokensTable)
      .where(eq(refreshTokensTable.userId, userId));
  }

  async create({
    userId,
    token,
    expiresAt,
  }: {
    userId: string;
    token: string;
    expiresAt: Date;
  }) {
    await this.db.insert(refreshTokensTable).values({
      userId,
      token,
      expiresAt,
    });
  }
}
