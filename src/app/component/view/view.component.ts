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
import { Proceso } from 'src/app/models/proceso';
import { Idocument } from 'src/app/models/idocument';
import { ITest } from 'src/app/models/itest';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  userDataFromSession!: IUsuarioSesion;
  url: SafeResourceUrl = '';
  documentFrames: Idocument[] = [];
  libConsecutivo!: number;
  empresaPrincipal: string = '';
  empresaFilial: string = '';
  nombreUsuario: string = '';
  candidato: string = '';
  userProfile!: Proceso;
  view: string  = 'TRUE'; 
  upload: string = ''; 
  tests!: View[];
  testsRequired!: ITest[];
  kindOftest!: string[];
  uniquePdf!: Boolean;



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
    this.getViews();
  }

  ngOnInit() {
    this.notiflixService.loadingStart('Cargando datos...');

    this.getDataInit();

  }
  async getViews(): Promise<void> {
    try {
      const userProfileOrNull = await this.authService.getFuntionByRole();
      if (userProfileOrNull !== null) {
        this.userProfile = userProfileOrNull;
        this.view = this.userProfile.rolVer;
      } else {
        // Si getFuntionByRole() devuelve null, manejar la situación aquí
        console.error('El perfil de usuario es null');
      }
    } catch (error) {
      console.error('Error obteniendo el perfil de usuario:', error);
    } finally {
      this.notiflixService.loadingClose(1000);
    }
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
    this.getTestsUploaded();
    
    this.notiflixService.loadingClose(1000);
  }

  async getTestsUploaded() {
    try {
      const tests = await this.service.getTests();
      if (tests !== null) {
        this.tests = tests;
        this.setUrl(this.tests);
        this.getTypesTests();
      } else {
        console.error('El servicio devolvió datos nulos');
      }
    } catch (error) {
      console.error('Error al obtener los tests:', error);
    }
  }

  async getTypesTests() {
    try {
      const testsReq = await this.service.getTestRequired();
      if (testsReq !== null) {
        this.testsRequired = testsReq;
        this.compareValuesAndHighlight();
      } else {
        console.error('El servicio devolvió datos nulos');
      }
    } catch (error) {
      console.error('Error al obtener los tests:', error);
    }
  }
  compareValuesAndHighlight(): void {
    let foundSpecialValue = false;

    for (const kindTest of this.kindOftest) {
      if (kindTest === '720784-000') {
        this.testsRequired.forEach(test => test.coincidente = true);
        foundSpecialValue = true;
        this.uniquePdf  = true;
        break;  
      }
    }

    if (!foundSpecialValue) {
      for (const kindTest of this.kindOftest) {
        const foundTest = this.testsRequired.find(test => test.prdProducto === kindTest);
        if (foundTest) {
          foundTest.coincidente = true;
        }
      }
    }
  }

  
  setUrl(testsDownload: View[]): void {
    this.documentFrames = [];
    this.kindOftest = [];
    
    if (testsDownload) {
      for (const test of testsDownload) {
        const url = `https://activos.analitica.com.co/AZDigital_Pruebas/ControlAdmin/BajarArchivo.php?ArId=${test.azdCodigoCli}`;
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        if(test.nombreArchivo){
        this.documentFrames.push({ src: safeUrl, nombreExamen: test.nombreArchivo, cargado: '' });
        this.kindOftest.push(test.tipoExamen);
      }
      }
    } else {
      console.error('El arreglo de tests está vacío o es nulo');
    }
  }
  
}
