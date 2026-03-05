import { Inject, Injectable } from '@nestjs/common';
import {
  DRIZZLE_DB,
  userOauthAccountsTable,
  usersTable,
} from '@dziki-zielnik/database';
import type { DB, OAuthProvider, Tx } from '@dziki-zielnik/database';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DB) {}

  findOne(email: string) {
    return this.db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  }

  async findByGoogleId(providerUserId: string) {
    const userOauthAccount = await this.db.query.userOauthAccountsTable.findFirst({
      with: {
        user: true
      },
      where: (userOauthAccount, { eq }) => eq(userOauthAccount.providerUserId, providerUserId)
    })

    return userOauthAccount?.user ?? undefined
  }

  async create(
    data: {
      email: string;
      displayName: string | null;
      avatarUrl: string | null;
    },
    tx?: Tx,
  ) {
    const db = tx || this.db;

    const [user] = await db.insert(usersTable).values(data).returning();

    return user;
  }

  async createOauthAccount(
    data: { userId: string; provider: OAuthProvider; providerUserId: string },
    tx?: Tx,
  ) {
    const db = tx || this.db;

    await db.insert(userOauthAccountsTable).values(data);
  }

  async createWithOauthAccount(userData: {email: string, displayName?: string, avatarUrl?: string}, oauthData: {provider: OAuthProvider, providerUserId: string}) {
    return this.db.transaction(async (tx) => {
      const user = await this.create({email: userData.email, displayName: userData.displayName ?? null, avatarUrl: userData.avatarUrl ?? null}, tx);
      await this.createOauthAccount({ ...oauthData, userId: user.id }, tx);
      return user;
    });
  }
}
