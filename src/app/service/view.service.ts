import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { IDatabaseResponse } from '../models/idatabase-response';
import { View } from './../models/view';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { NotiflixService } from '../shared/services/notiflix.service';
import { Variables } from '../constants/variables';
import { ItemSession } from '../shared/constants/item-session';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http: HttpClient, 
    private sessionService: SessionStorageService,
    private notiflixService: NotiflixService) { }

  getTests(): Promise<any | null> {
    return new Promise((resolve) => {
      try {
        let libConsecutivoSession = this.sessionService.getItem(ItemSession.INDEX_BOOK);
        this.http.get<any >(environment.urlServices + 'azfile/listar/' + libConsecutivoSession )
          .subscribe((response: any ) => {
            if (!response) {
              this.notiflixService.error('Error', "No se ha podido obtener examenes para el candidato " + libConsecutivoSession , 'Aceptar');
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
  getTestRequired(): Promise<any | null> {
    return new Promise((resolve) => {
      try {
        let libConsecutivoSession = this.sessionService.getItem(ItemSession.INDEX_BOOK);
        this.http.get<any >(environment.urlServices + 'documento/listar/' + libConsecutivoSession )
          .subscribe((response: any ) => {
            if (!response) {
              this.notiflixService.error('Error', "No se ha podido obtener los tipos de examenes para el candidato " + libConsecutivoSession , 'Aceptar');
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
