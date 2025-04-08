import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let requiredRoles = route.data['roles'];
  if (!Array.isArray(requiredRoles)) {
    requiredRoles = requiredRoles ? [requiredRoles] : [];
  }
  const token = authService.getToken();
  if (!token) {
    router.navigate(['login']);
    return false;
  }

  const user = authService.parseJwt(token);
  const userRoles: string[] = (user?.roles as string[]) || [];

  const allowed = requiredRoles.some((r:string) => userRoles.includes(r));

  if (!allowed) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
