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

  const requiredRoles = route.data['roles'] as string[];

  const token = authService.getToken();
  if (!token) {
    router.navigate(['login']);
    return false;
  }

  const user = authService.parseJwt(token);
  if (!user || !requiredRoles.includes(user.role)) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
