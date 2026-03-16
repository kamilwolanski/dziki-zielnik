import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@dziki-zielnik/database';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const roles = this.reflector.getAllAndOverride<Role[]>(
      'roles',
      [
        context.getHandler(),
        context.getClass(), 
      ],
    );

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.includes(user.role);
  }
}
