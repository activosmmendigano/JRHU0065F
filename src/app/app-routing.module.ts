import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { ForbiddenPageComponent } from './shared/layout/forbidden-page/forbidden-page.component';
import { UploadComponent } from './component/upload/upload.component';
import { ViewComponent } from './component/view/view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Rutas } from './shared/constants/routes';
import { canActivateTeam } from './shared/guards/can-activate.guard';

const routes: Routes = [
  {path: Rutas.INICIO, redirectTo: Rutas.VIEW,  pathMatch: 'full'},
  {path: Rutas.VIEW, component: ViewComponent, canActivate: [canActivateTeam]},  
  {path: Rutas.UPLOAD, component: UploadComponent},
  {path: Rutas.FORBIDDEN, component: ForbiddenPageComponent},
  {path: Rutas.NOT_FOUND, component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
