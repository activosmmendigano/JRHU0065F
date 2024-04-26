import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateTeam: CanActivateFn =
  (route: ActivatedRouteSnapshot) => {
    return inject(AuthService).canActivate(route.queryParams['libConsecutivo']);
  };