
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { authLoginBodySchema, UserJwtPayload, type AuthLoginBody } from '@dziki-zielnik/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('dev-login')
  signIn(@Body(new ZodValidationPipe(authLoginBodySchema)) body: AuthLoginBody) {
    return this.authService.signIn(body.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: UserJwtPayload}) {
    return req.user;
  }
}
