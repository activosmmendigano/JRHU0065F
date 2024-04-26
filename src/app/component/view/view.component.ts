import { View } from '../../models/view';
import { ViewService } from '../../service/view.service';
import { Component, OnInit } from '@angular/core';
import { NotiflixService } from 'src/app/shared/services/notiflix.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
interface DocumentFrame {
src: string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  documento!: string;
  url: SafeResourceUrl = '';
  documentFrames: { src: SafeResourceUrl }[] = [];

  constructor(
    private service: ViewService,
    private notiflixService: NotiflixService,
    private sanitizer: DomSanitizer // Agrega el servicio DomSanitizer aquí
  ) {}

  ngOnInit() {
    this.notiflixService.loadingStart('Cargando estadísticas...');
    this.obtenerDataInit();
    this.setUrl();
  }

  obtenerDataInit(): void {
   
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
        { src: this.url }
      ];
  }



}
