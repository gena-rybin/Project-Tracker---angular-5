import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AEmployeesComponent} from './a-employees/a-employees.component';
import {AdminComponent} from './admin.component';
import {AProjectsComponent} from './a-projects/a-projects.component';

const routes: Routes = [
      {path: '', component: AdminComponent}, // canActivate: [AdminGuard]
      {path: 'employees', component: AEmployeesComponent}, // canActivate: [AdminGuard]
      {path: 'projects', component: AProjectsComponent}, // canActivate: [AdminGuard]
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
