
import { NotiflixService } from '../../shared/services/notiflix.service';
import { UploadService } from '../../service/upload.service';
import { Iupload } from '../../models/iupload';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { IUsuarioSesion } from 'src/app/models/iusuario-sesion';
import { ItemSession } from 'src/app/shared/constants/item-session';
import { ViewService } from 'src/app/service/view.service';
import { ITest } from 'src/app/models/itest';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  userDataFromSession!: IUsuarioSesion;
  selectedTest: string | undefined; // Definir la propiedad selectedTest

  constructor(
    private service: ViewService,
    private sessionStorageService: SessionStorageService,
    private _notiflixService: NotiflixService
  ) {
    this.userDataFromSession = this.sessionStorageService.getItemJson(
      ItemSession.USER_DATA
    );
  }

  datatable!: Iupload[];
  upload!: Iupload;
  loading: boolean = true;
  visualizaDetalle: boolean = false;
  testsRequired!: ITest[];
  valuePDF: string | undefined;
  ngOnInit() {
    this.getTypesTests();
    this._notiflixService.loadingStart('Cargando datos...');
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  async getTypesTests() {
    try {
      const testsReq = await this.service.getTestRequired();
      if (testsReq !== null) {
        this.testsRequired = testsReq;
      } else {
        console.error('El servicio devolvió datos nulos');
      }
    } catch (error) {
      console.error('Error al obtener los tests:', error);
    }finally {
      this._notiflixService.loadingClose(1000);
    }
  }
}
