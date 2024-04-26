import { SessionStorageService } from './session-storage.service';
import { Rutas } from '../constants/routes';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUsuarioSesion } from 'src/app/models/iusuario-sesion';
import { environment } from 'src/environments/environment.development';
import { ItemSession } from '../constants/item-session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private sessionService: SessionStorageService
  ) {}

  canActivate(userSession: string): Promise<boolean> {
    return new Promise((resolve) => {
      let libConsecutivo =
        userSession ?? this.sessionService.getItem(ItemSession.USER_DATA);
      if (!libConsecutivo) {
        this.router.navigate([Rutas.FORBIDDEN]);
        this.clearSesion();
        return resolve(false);
      }
      this.http
        .get<IUsuarioSesion>(
          environment.urlServices + '/sesion/buscarSesion/' + libConsecutivo
        )
        .subscribe((response: IUsuarioSesion) => {
          if (!response.dsaId) {
            this.router.navigate([Rutas.FORBIDDEN]);
            this.clearSesion();
            return resolve(false);
          }
          this.sessionService.setItemJson(ItemSession.USER_DATA, response);
          this.sessionService.setItem(ItemSession.SESSION, libConsecutivo);
          return resolve(true);
        });
    });
  }

  getDominioEjecucion(usSession: string): Promise<number | null> {
    return new Promise((resolve) => {
      this.http
        .get<number>(
          environment.urlServices + '/sesion/obtenerDominioPqrs/' + usSession
        )
        .subscribe((response: number) => {
          if (response) {
            return resolve(response);
          }
          return resolve(null);
        });
    });
  }

  /**
   * Función encargada de limpiar la caché
   */
  clearSesion(): void {
    sessionStorage.clear();
  }
}
