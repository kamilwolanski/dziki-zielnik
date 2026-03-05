import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  type AuthGoogleLoginBody,
  authGoogleLoginBodySchema,
  authLoginBodySchema,
  type UserJwtPayload,
  type AuthLoginBody,
} from '@dziki-zielnik/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('dev-login')
  signIn(
    @Body(new ZodValidationPipe(authLoginBodySchema)) body: AuthLoginBody,
  ) {
    if (process.env.NODE_ENV === 'production') {
      throw new ForbiddenException();
    }
    return this.authService.signIn(body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: UserJwtPayload }) {
    return req.user;
  }

  @Post('google')
  async googleLogin(
    @Body(new ZodValidationPipe(authGoogleLoginBodySchema))
    body: AuthGoogleLoginBody,
  ) {
    return this.authService.googleLogin(body.idToken);
  }
}
