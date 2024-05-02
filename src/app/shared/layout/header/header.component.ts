import { Component } from '@angular/core';
import { NotiflixService } from '../../services/notiflix.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { ItemSession } from '../../constants/item-session';
import { Proceso } from 'src/app/models/proceso';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userProfile!: Proceso;
  view: string  = ''; 
  upload: string = ''; 

  constructor(
    private sessionStorageService: SessionStorageService,
    private authService: AuthService,
    private notiflixService: NotiflixService
  ) {
    this.notiflixService.loadingStart('Cargando datos...');
    this.getViews();
  }

async getViews(): Promise<void> {
  try {
    const userProfileOrNull = await this.authService.getFuntionByRole();
    if (userProfileOrNull !== null) {
      this.userProfile = userProfileOrNull;
      this.view = this.userProfile.rolVer;
      this.upload = this.userProfile.rolCargar;
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


  toggleNavbar = false;
}

