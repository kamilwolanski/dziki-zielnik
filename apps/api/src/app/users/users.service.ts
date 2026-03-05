import { UsersRepository } from '@dziki-zielnik/data-access';
import type { User } from '@dziki-zielnik/database';
import { Injectable } from '@nestjs/common';
import { CreateUserFromGoogleInput } from './inputs/create-user-from-google.input';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOne(email: string): Promise<User | null> {
    return (await this.usersRepository.findOne(email)) ?? null;
  }

  async findByGoogleId(providerUserId: string) {
    return (await this.usersRepository.findByGoogleId(providerUserId)) ?? null;
  }

  async createFromGoogle(input: CreateUserFromGoogleInput): Promise<User> {
    return this.usersRepository.createWithOauthAccount(
      {
        email: input.email,
        displayName: input.displayName,
        avatarUrl: input.avatarUrl,
      },
      { provider: 'google', providerUserId: input.providerUserId },
    );
  }
}
