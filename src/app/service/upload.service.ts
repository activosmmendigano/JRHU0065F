import { Iupload } from '../models/iupload';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { NotiflixService } from '../shared/services/notiflix.service';
import { Observable } from 'rxjs';
import { IDatabaseResponse } from '../models/idatabase-response';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private notiflixService: NotiflixService) { }

  getAll(): Promise<Iupload[] | null> {
    return new Promise((resolve) => {
      try {
        this.http.get<Iupload[]>(environment.urlServices + '/upload/getAll').subscribe({
          next: (response) => {
            if (response) {
              return resolve(response);
            }
            return resolve(null);
          },
          error: (error) => {
            this.notiflixService.error('Error', error.message, 'Aceptar');
            resolve(null);
          }
        });
      } catch (error: any) {
        this.notiflixService.error('Error', error.message, 'Aceptar');
        resolve(null);
      }
    });
  }

  create(upload: Iupload): Observable<IDatabaseResponse> | null {
    return this.http.post<IDatabaseResponse>(environment.urlServices + '/upload/create', upload);
  }

  update(upload: Iupload): Observable<IDatabaseResponse> | null {
    return this.http.put<IDatabaseResponse>(environment.urlServices + '/upload/update', upload);
  }

}
