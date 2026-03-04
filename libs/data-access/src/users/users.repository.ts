import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB } from '@dziki-zielnik/database';
import type { DB } from '@dziki-zielnik/database';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DB) {}

  findOne(email: string) {
    return this.db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
  }
}
