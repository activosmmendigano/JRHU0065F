import { View } from '../../models/view';
import { ViewService } from '../../service/view.service';
import { Component, OnInit } from '@angular/core';

import { Confirm } from 'notiflix';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ItemSession } from '../../shared/constants/item-session';
import { SessionStorageService } from '../../shared/services/session-storage.service';
import { NotiflixService } from '../../shared/services/notiflix.service';
import { IUsuarioSesion } from 'src/app/models/iusuario-sesion';
import { AuthService } from 'src/app/shared/services/auth.service';

interface DocumentFrame {
  src: string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  userDataFromSession!: IUsuarioSesion;
  documento!: string;
  url: SafeResourceUrl = '';
  documentFrames: { src: SafeResourceUrl }[] = [];
  libConsecutivo!: number;
  empresaPrincipal: string = '';
  empresaFilial: string = '';
  nombreUsuario: string = '';
  candidato: string = '';

  constructor(
    private service: ViewService,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private notiflixService: NotiflixService,
    private sanitizer: DomSanitizer
  ) {
    Confirm.init({
      width: '500px',
      messageMaxLength: 5000,
    });
    this.userDataFromSession = this.sessionStorageService.getItemJson(
      ItemSession.USER_DATA
    );
  }

  ngOnInit() {
    this.notiflixService.loadingStart('Cargando datos...');
    this.getDataInit();
    this.setUrl();
  }

  getDataInit(): void {
    

    if (!this.userDataFromSession.libConsecutivo) {
      this.notiflixService.alerta(
        'Alerta',
        'No se ha podido recuperar la información del libro del candidato, recargue la aplicación.',
        'Aceptar'
      );
      return;
    }
    this.nombreUsuario = this.userDataFromSession.nombreUsuario;
    this.candidato =
      this.userDataFromSession.primerApellidoCandidato +
      ' ' +
      this.userDataFromSession.segundoApellidoCandidato +
      ' ' +
      this.userDataFromSession.primerNombreCandidato + 
      ' ' + 
      this.userDataFromSession.segundoNombreCandidato +
      ' identificado con ' +
      this.userDataFromSession.tdcTdEpl + ' ' +this.userDataFromSession.eplNd +
      ' ' ;
    this.libConsecutivo = this.userDataFromSession.libConsecutivo;
    this.empresaPrincipal = this.userDataFromSession.tdcTd + ' ' + this.userDataFromSession.empNd;
    this.empresaFilial = this.userDataFromSession.tdcTdFil + ' ' + this.userDataFromSession.empNdFil;

    this.notiflixService.loadingClose(1000);
  }

  setUrl(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://activos.analitica.com.co/AZDigital_Pruebas/ControlAdmin/BajarArchivo.php?ArId=2984548'
    );
    this.documentFrames = [
      { src: this.url },
      { src: this.url },
      { src: this.url },
      { src: this.url },
      { src: this.url },
    ];
  }
}
