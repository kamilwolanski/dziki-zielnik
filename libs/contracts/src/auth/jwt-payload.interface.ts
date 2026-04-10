import { Role } from './user-role.enum';

export interface JwtSignPayload {
  sub: string;
  role: Role;
}

export interface UserJwtPayload extends JwtSignPayload {
  exp: number;
  iat: number;
}
