import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from '@dziki-zielnik/data-access';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
