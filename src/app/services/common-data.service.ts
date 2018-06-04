import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {EmployeeModel} from '../models/employee.model';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import {ProjectModel} from '../models/project.model';
import {BackendService} from './backend.service';

@Injectable()
export class CommonDataService implements OnDestroy {
  alive = true;

  _user = new Subject<EmployeeModel>();
  user$ = this._user.asObservable();
  user: EmployeeModel;

  _userProjects = new Subject<Array<ProjectModel>>();
  userProjects$ = this._userProjects.asObservable();
  userProjects: Array<ProjectModel>;

  _projects = new Subject<Array<ProjectModel>>();
  projects$ = this._projects.asObservable();
  projects: Array<ProjectModel>;

  _employees = new Subject<Array<EmployeeModel>>();
  employees$ = this._employees.asObservable();
  employees: Array<EmployeeModel>;

  constructor(public router: Router,
              public backendService: BackendService) {}

  ngOnDestroy() {
    this.alive = false;
  }

  public setCurrentUser(value: EmployeeModel) {
    this.user = value;
    this._user.next(value);
  }
  public getCurrentUser(): EmployeeModel {
    let user: EmployeeModel;
    if (this.user && this.user.FullName) {user = this.user; } else {
      user = <EmployeeModel>this.tryJsonParse(sessionStorage.getItem('_user'));
    }
    return user;
  }


  public loadUserProjectsFromServer(id: number): void {
    this.backendService.getProjectsByEmployee(id)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        this.setUserProjects(res);
      }, (err) => {
        console.log(err);
      } );
  }

  public setUserProjects(value: Array<ProjectModel>) {
    this.userProjects = value;
    this._userProjects.next(value);
  }

  public getUserProjects(): Array<ProjectModel> {
    return this.userProjects;
  }


  public loadProjectsFromServer(): void {
    this.backendService.getProjects()
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        this.setProjects(res);
      }, (err) => {
        console.log(err);
      } );
  }

  public setProjects(value: Array<ProjectModel>) {
    this.projects = value;
    this._projects.next(value);
  }

  public getProjects(): Array<ProjectModel> {
    return this.projects;
  }


  public loadEmployeesFromServer(): void {
    this.backendService.getAllEmployees()
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        this.setEmployees(res);
      }, (err) => {
        console.log(err);
      } );
  }

  public setEmployees(value: Array<EmployeeModel>) {
    this.employees = value;
    this._employees.next(value);
  }
  public getEmployees(): Array<EmployeeModel> {
    return this.employees;
  }

  public tryJsonParse(json: any): any {
    let parsed;
    try {
      parsed = JSON.parse(json);
    } catch (e) {
      parsed = undefined;
    }
    return parsed;
  }

  public clearAll() {
    this.user = new EmployeeModel();
    this.employees = Array<EmployeeModel>(0);
    this.projects = Array<ProjectModel>(0);
  }

  public logout(): void {
    this.clearAll();
    sessionStorage.removeItem('_user');
    this.router.navigate(['sign-in']);
  }


}
