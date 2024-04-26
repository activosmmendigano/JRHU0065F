
import { NotiflixService } from '../../shared/services/notiflix.service';
import { UploadService } from '../../service/upload.service';
import { Iupload } from '../../models/iupload';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  constructor(
    private _service: UploadService,
    private _notiflixService: NotiflixService
  ) {}

  datatable!: Iupload[];
  upload!: Iupload;
  loading: boolean = true;
  visualizaDetalle: boolean = false;


  ngOnInit() {
    this._notiflixService.loadingStart('Cargando datos...');
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.getListUpload();
  }

  getListUpload(): void {
    /*this._service
      .getAll()
      .then((lista: Iupload[] | null) => {
        if (lista) {
          this.datatable = lista;
        }
      })
      .finally(() => {*/
        this._notiflixService.loadingClose(1000);
     // });
  }

}
