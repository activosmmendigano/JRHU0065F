import { SessionStorageService } from './session-storage.service';
import { Rutas } from '../constants/routes';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUsuarioSesion } from 'src/app/models/iusuario-sesion';
import { environment } from 'src/environments/environment.development';
import { ItemSession } from '../constants/item-session';
import { Notify } from 'notiflix';
import { Proceso } from 'src/app/models/proceso';
import { NotiflixService } from './notiflix.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient, 
    private sessionService: SessionStorageService,
    private notiflixService: NotiflixService
  ) {}

  canActivate(libConsecutivo: string, usuUsuario: string): Promise<boolean> {
    return new Promise((resolve) => {

      let libConsecutivoSession =
        libConsecutivo ?? this.sessionService.getItem(
          ItemSession.INDEX_BOOK);
        let usuUsuarioSession =
        usuUsuario ?? this.sessionService.getItem(
          ItemSession.USER);

      if (!libConsecutivoSession) {
        this.router.navigate([Rutas.FORBIDDEN]);
        this.clearSesion();
        return resolve(false);
      }

      this.http
        .get<any>(
          `${environment.urlServices}/config/getDataInit/${libConsecutivoSession}/${usuUsuarioSession}`
        )
        .subscribe((response: any) => {
          Notify.success('Buen día, ' + response.nombreUsuario);

          if (!response) {
            this.router.navigate([Rutas.FORBIDDEN]);
            this.clearSesion();
            return resolve(false);
          }
          this.sessionService.setItemJson(ItemSession.USER_DATA, response);
          this.sessionService.setItem(
            ItemSession.INDEX_BOOK,
            response.libConsecutivo
          );
          this.sessionService.setItem(
            ItemSession.USER,
            response.usuUsuario
          );
            return resolve(true);
        });
    });
  }

  getFuntionByRole(): Promise<Proceso | null> {
    return new Promise((resolve) => {
      try {
        let usuUsuarioSession = this.sessionService.getItem(ItemSession.USER);
        this.http.get<Proceso>(environment.urlServices + '/config/getFuntionByRole/' + usuUsuarioSession)
          .subscribe((response: Proceso) => {
            if (!response) {
              this.notiflixService.error('Error', "No se ha podido obtener las estadísticas parametrizadas para el grupo " + usuUsuarioSession, 'Aceptar');
              resolve(null);
            }
            return resolve(response);
          });
      } catch (error: any) {
        this.notiflixService.error('Error', error.message, 'Aceptar');
        resolve(null);
      }
    });
  }

  /**
   * Función encargada de limpiar la caché
   */
  clearSesion(): void {
    sessionStorage.clear();
  }
}
