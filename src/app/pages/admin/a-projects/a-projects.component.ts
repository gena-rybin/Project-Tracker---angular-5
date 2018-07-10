import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeModel} from '../../../models/employee.model';
import {CommonDataService} from '../../../services/common-data.service';
import {ProjectModel} from '../../../models/project.model';
import {BackendService} from '../../../services/backend.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'pt-a-projects',
  templateUrl: './a-projects.component.html',
  styleUrls: ['./a-projects.component.css']
})
export class AProjectsComponent implements OnInit, OnDestroy {
  projects = Array<ProjectModel>(0);
  _projects = Array<ProjectModel>(0);
  employees = Array<EmployeeModel>(0);
  displayReactiveDialog = false;
  displayDialog = false;
  input_find_by_description = '';
  alive = true;

  constructor(public commonDataService: CommonDataService,
              public backendService: BackendService,
              private confirmationService: ConfirmationService) {
    commonDataService.projects$.subscribe((value: Array<ProjectModel>) => {
      this.projects = value;
      this._projects = value.slice();
    });

    commonDataService.employees$.subscribe((value: Array<EmployeeModel>) => {
      this.employees = value;
    });
  }

  ngOnInit() {
    this.commonDataService.loadProjectsFromServer();
    const employees = this.commonDataService.getEmployees();
    if (employees && employees.length) {
      this.employees = employees;
    } else {
      this.commonDataService.loadEmployeesFromServer();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  findPByName() {
    const temp = [];
    const arr = this._projects.slice();

    if (this.input_find_by_description.length > 0) {
      arr.forEach((obj) => {
        if (obj && obj.Description && obj.Description.length) {
          if (~(obj.Description.toLowerCase()).indexOf(this.input_find_by_description.toLowerCase())) {
            this.projects = this._projects.slice();
            this.projects.forEach(project => {
              if (project.Id === obj.Id) {
                temp.push(project);
              }
            });
          }
        }
      });
      this.projects = temp;
    } else {
      this.projects = this._projects.slice();
    }
  }

  public confirmDelete(target: ProjectModel) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this project?',
      accept: () => {
        this.deleteItem(target);
      }
    });
  }

  public deleteItem(target: ProjectModel) {
    const id_target = target.Id;
    this.projects.forEach((empl, i) => {
      if (target.Id === empl.Id) {
        this.projects.splice(i, 1);
      }
    });
    this.commonDataService.setProjects(this.projects);
    this._projects = this.projects.slice();

    this.backendService.deleteProject(+id_target)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
      }, (err) => {
        console.log(err);
      } );
  }

  showDialogToAdd() {
    this.displayReactiveDialog = false;
    this.displayDialog = true;
  }

  showReactiveDialogToAdd() {
    this.displayDialog = false;
    this.displayReactiveDialog = true;
  }

  successSaveHandler(successSave: boolean) {
    if (successSave) {
      this.commonDataService.loadProjectsFromServer();
    }
  }

}
