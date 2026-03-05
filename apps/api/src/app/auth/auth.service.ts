import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, JwtSignPayload } from '@dziki-zielnik/contracts';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from '../users/users.service';
import { userPublicSchema } from '@dziki-zielnik/contracts'

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.googleClient = new OAuth2Client(
      this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
    );
  }

  async signIn(email: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowe dane logowania');
    }

    const payload: JwtSignPayload = {
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async googleLogin(idToken: string): Promise<AuthResponse> {
    let ticket;
    console.log('idTokens', idToken)
    try {
      ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
      });
    } catch(error) {
      console.error('Google verify error:', error.message);
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

    const jwtPayload: JwtSignPayload = {
      sub: user.id,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(jwtPayload),
      user: userPublicSchema.parse(user)
    };
  }
}
