import { User } from "@dziki-zielnik/database";

export interface JwtSignPayload {
  id: string;
  email: string;
  role: User['role'];
}

export interface UserJwtPayload extends JwtSignPayload {
  exp: number;
  iat: number;
}
