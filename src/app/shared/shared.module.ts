import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ForbiddenPageComponent } from './layout/forbidden-page/forbidden-page.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { DefaultComponent } from './layout/default/default.component';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { AccordionModule } from 'primeng/accordion';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ForbiddenPageComponent,
    PageNotFoundComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    TableModule,
    TagModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TriStateCheckboxModule,
    AccordionModule,
    NgbCollapseModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    DefaultComponent,
  ],
  providers: [DynamicDialogRef, DialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
