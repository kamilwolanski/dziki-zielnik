import { UsersRepository } from '@dziki-zielnik/data-access';
import { User } from '@dziki-zielnik/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async findOne(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne(email) ?? null;

    return user
  }
}
