import { Component } from '@angular/core';
import { NotiflixService } from '../../services/notiflix.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { ItemSession } from '../../constants/item-session';
import { Proceso } from 'src/app/models/proceso';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() { }

  closeWindow() {
    sessionStorage.clear();
    window.location.href = 'http://forms.activos.com.co/forms/frmservlet?config=activos';
  }
  toggleNavbar = true;
}

