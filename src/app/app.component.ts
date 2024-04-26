import { NotiflixService } from './shared/services/notiflix.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'JRHU0065F';

  constructor(private config: PrimeNGConfig, private _notiflixService: NotiflixService) { }

  ngOnInit(): void {
    this.config.setTranslation({
      startsWith: 'Empieza con',
      contains: 'Contiene',
      notContains: 'No contiene',
      endsWith: 'Acaba en',
      equals: 'Igual a',
      notEquals: 'No igual a',
      noFilter: 'Sin filtro',
      lt: 'Menor que',
      lte: 'Menor o igual a',
      gt: 'Mayor que',
      gte: 'Mayor o igual que'
    });
    this._notiflixService.setLoadingConfig({svgColor: '#f2a325'});
  }
}
