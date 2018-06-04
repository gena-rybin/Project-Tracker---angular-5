import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TimesheetsComponent} from './pages/timesheets/timesheets.component';
import {ProjectProfileComponent} from './pages/project-profile/project-profile.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {LoginComponent} from './pages/login/login.component';
import {AutorizationGuardService} from './guards/autorization-guard.service';
// import {AdminComponent} from './pages/admin/admin.component';
// import {AProjectsComponent} from './pages/admin/a-projects/a-projects.component';
// import {AEmployeesComponent} from './pages/admin/a-employees/a-employees.component';


const routes: Routes = [
  { path: '', component: TimesheetsComponent, canActivate: [AutorizationGuardService], pathMatch: 'full'},
  { path: 'sign-in', component: LoginComponent},
  { path: 'tasks', component: TasksComponent, canActivate: [AutorizationGuardService]},
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AutorizationGuardService]},
  // { path: 'project-profile', component: ProjectProfileComponent, canActivate: [AutorizationGuardService]},

  // {path: 'admin', component: AdminComponent}, // canActivate: [AdminGuard]
  // {path: 'admin/employees', component: AEmployeesComponent}, // canActivate: [AdminGuard]
  // {path: 'admin/projects', component: AProjectsComponent}, // canActivate: [AdminGuard]
  {
    path: 'admin', loadChildren: 'app/pages/admin/admin.module#AdminModule'
  },
  { path: '**', component: LoginComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}
