import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  AuthRefreshResponse,
  authRefreshResponseSchema,
  AuthResponse,
  JwtSignPayload,
} from '@dziki-zielnik/contracts';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { userPublicSchema } from '@dziki-zielnik/contracts';
import { RefreshTokensRepository } from '@dziki-zielnik/data-access';
import { User } from '@dziki-zielnik/database';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private refreshTokensRepository: RefreshTokensRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
    );
  }

  private generateRefreshToken(): string {
    return randomBytes(64).toString('hex');
  }

  private getRefreshTokenExpiry(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 30); // 30 dni
    return date;
  }

  private async createTokens(
    userId: string,
    role: User['role'],
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtSignPayload = {
      sub: userId,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = this.generateRefreshToken();

    try {
      await this.refreshTokensRepository.create({
        userId,
        token: refreshToken,
        expiresAt: this.getRefreshTokenExpiry(),
      });
    } catch {
      throw new InternalServerErrorException('Failed to create session');
    }

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signIn(email: string): Promise<AuthResponse> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }

    const tokens = await this.createTokens(user.id, user.role);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userPublicSchema.parse(user),
    };
  }

  async refresh(refreshToken: string): Promise<AuthRefreshResponse> {
    const stored = await this.refreshTokensRepository.findOne(refreshToken);

    if (!stored) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.usersService.findById(stored.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.refreshTokensRepository.delete(refreshToken);

    return authRefreshResponseSchema.parse(await this.createTokens(user.id, user.role))
  }

  async googleLogin(idToken: string): Promise<AuthResponse> {
    let ticket;

    try {
      ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
      });
    } catch {
      throw new UnauthorizedException('Invalid Google token');
    }

    const payload = ticket.getPayload();

    if (!payload) {
      throw new UnauthorizedException();
    }

    if (!payload.email || !payload.email_verified) {
      throw new UnauthorizedException('Email not verified');
    }

    const email = payload.email;
    const name = payload.name;
    const avatar = payload.picture;
    const providerUserId = payload.sub;

    let user = await this.usersService.findByGoogleId(providerUserId);

    if (!user) {
      user =
        (await this.usersService.findOne(email)) ??
        (await this.usersService.createFromGoogle({
          email,
          displayName: name,
          avatarUrl: avatar,
          providerUserId,
        }));
    }

    const tokens = await this.createTokens(user.id, user.role);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: userPublicSchema.parse(user),
    };
  }

  async logout(refreshToken: string): Promise<void> {
    await this.refreshTokensRepository.delete(refreshToken);
  }
}
