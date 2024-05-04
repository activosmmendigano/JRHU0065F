import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const canActivateTeam: CanActivateFn =
  (route: ActivatedRouteSnapshot) => {
    const libConsecutivo = route.queryParams['libConsecutivo'];
    const usuUsuario = route.queryParams['usuUsuario'];
    return inject(AuthService).canActivate(libConsecutivo, usuUsuario);
  };
