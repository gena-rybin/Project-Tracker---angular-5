import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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

import {NgDragDropModule} from 'ng-drag-drop';
import {NgDragDropService} from 'ng-drag-drop/src/services/ng-drag-drop.service';

import {TimesheetsComponent} from './timesheets/timesheets.component';
import {AppComponent} from './index-page/app.component';
import {AppRoutingModule} from '../app-routing.module';
import {TasksComponent} from './tasks/tasks.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {ProjectProfileComponent} from './project-profile/project-profile.component';
import {LoginComponent} from './login/login.component';
import {DisplayArrayAsStringPipe} from '../pipes/display-array-as-string.pipe';
import {NewTaskModalComponent} from './tasks/new-task-modal/new-task-modal.component';
import {NewTimeModalComponent} from './timesheets/new-time-modal/new-time-modal.component';
import {SharedModule} from './shared/shared.module';
// import {AdminComponent} from './admin/admin.component';
// import {AProjectsComponent} from './admin/a-projects/a-projects.component';
// import {AEmployeeModalComponent} from './admin/a-employees/a-employee-modal/a-employee-modal.component';
// import {AProjectModalComponent} from './admin/a-projects/a-project-modal/a-project-modal.component';
// import {AEmployeesComponent} from './admin/a-employees/a-employees.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetsComponent,
    TasksComponent,
    UserProfileComponent,
    ProjectProfileComponent,
    LoginComponent,
    DisplayArrayAsStringPipe,
    NewTaskModalComponent,
    NewTimeModalComponent,
    // AdminComponent,
    // AEmployeesComponent,
    // AProjectsComponent,
    // AEmployeeModalComponent,
    // AProjectModalComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    AppRoutingModule,
    InputTextModule, ButtonModule, TableModule, DialogModule, TabViewModule, CalendarModule, InputTextareaModule,
    OverlayPanelModule, TooltipModule, ConfirmDialogModule,
    NgDragDropModule
  ],
  exports: [
    AppComponent,
    TimesheetsComponent,
    TasksComponent,
    UserProfileComponent,
    ProjectProfileComponent,
    LoginComponent,
    DisplayArrayAsStringPipe,
    NewTaskModalComponent,
    NewTimeModalComponent,
    // AdminComponent,
    // AEmployeesComponent,
    // AProjectsComponent,
    // AEmployeeModalComponent,
    // AProjectModalComponent,

  ],
  providers: [NgDragDropService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class PagesModule { }
