import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import {AdminRoutingModule} from './admin-routing.module';
import {AProjectModalComponent} from './a-projects/a-project-modal/a-project-modal.component';
import {AEmployeesComponent} from './a-employees/a-employees.component';
import {AdminComponent} from './admin.component';
import {AEmployeeModalComponent} from './a-employees/a-employee-modal/a-employee-modal.component';
import {AProjectsComponent} from './a-projects/a-projects.component';
import {SharedModule} from '../shared/shared.module';
import {FindByNamePipe} from '../../pipes/find-by-name.pipe';
import {FindByDescriptionPipe} from '../../pipes/find-by-description.pipe';
import { AProjectModReactiveFComponent } from './a-projects/a-project-mod-reactive-f/a-project-mod-reactive-f.component';
import { AEmployeesModReactiveFComponent } from './a-employees/a-employees-mod-reactive-f/a-employees-mod-reactive-f.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    InputTextModule, ButtonModule, TableModule, DialogModule, TabViewModule, CalendarModule, InputTextareaModule,
    OverlayPanelModule, TooltipModule, ConfirmDialogModule

  ],
  declarations: [
    AdminComponent,
    AEmployeesComponent,
    AProjectsComponent,
    AEmployeeModalComponent,
    AProjectModalComponent,
    FindByNamePipe,
    FindByDescriptionPipe,
    AProjectModReactiveFComponent,
    AEmployeesModReactiveFComponent
  ],
  exports: [
    AdminComponent,
    AEmployeesComponent,
    AProjectsComponent,
    AEmployeeModalComponent,
    AProjectModalComponent,
    FindByNamePipe,
    FindByDescriptionPipe,
    AProjectModReactiveFComponent,
    AEmployeesModReactiveFComponent
  ],
  providers: [ConfirmationService]
})
export class AdminModule { }
