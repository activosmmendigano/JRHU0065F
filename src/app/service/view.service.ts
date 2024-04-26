import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { IDatabaseResponse } from '../models/idatabase-response';
import { View } from './../models/view';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { NotiflixService } from '../shared/services/notiflix.service';
import { Variables } from '../constants/variables';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http: HttpClient, private notiflixService: NotiflixService) { }

  getViews(): Promise<View[] | null> {
    return new Promise((resolve) => {
      try {
        this.http.get<View[]>(environment.urlServices + '/estadisticas/getViewsSrc/' + Variables.AGE_CODIGO_DEFAULT)
          .subscribe((response: View[]) => {
            if (!response) {
              this.notiflixService.error('Error', "No se ha podido obtener las estadísticas parametrizadas para el grupo " + Variables.AGE_CODIGO_DEFAULT, 'Aceptar');
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

}
