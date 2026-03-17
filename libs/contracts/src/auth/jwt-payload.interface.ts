import { Role } from "@dziki-zielnik/database";

export interface JwtSignPayload {
  sub: string;
  role: Role;
}

export interface UserJwtPayload extends JwtSignPayload {
  exp: number;
  iat: number;
}
