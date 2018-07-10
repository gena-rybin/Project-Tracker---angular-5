import {Component, OnDestroy, OnInit} from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {EmployeeModel} from '../../../models/employee.model';
import {CommonDataService} from '../../../services/common-data.service';
import {ProjectModel} from '../../../models/project.model';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'pt-a-employees',
  templateUrl: './a-employees.component.html',
  styleUrls: ['./a-employees.component.css']
})
export class AEmployeesComponent implements OnInit, OnDestroy {
  employees = Array<EmployeeModel>(0);
  _employees = Array<EmployeeModel>(0);
  newEmployees: EmployeeModel;
  displayDialog = false;
  displayReactiveDialog = false;
  input_find_by_name = '';
  allProjects = Array<ProjectModel>(0);
  cols: any[];
  alive = true;

  constructor(public backendService: BackendService,
              public commonDataService: CommonDataService,
              private confirmationService: ConfirmationService) {
    commonDataService.projects$.subscribe((value: Array<ProjectModel>) => {
      this.allProjects = value;
    });

    commonDataService.employees$.subscribe((value: Array<EmployeeModel>) => {
      this.employees = value;
      console.log(this.employees);
      this._employees = value.slice();
    });
    this.cols = [
      { field: 'Id', header: 'Id' },
      { field: 'FullName', header: 'FullName' },
      { field: 'Email', header: 'Email' },
      { field: 'Position.Name', header: 'Position' },
      { field: 'Projects', header: 'Projects' }
    ];

  }

  ngOnInit() {
    this.commonDataService.loadEmployeesFromServer();
    const allProjects = this.commonDataService.getProjects();
    if (allProjects && allProjects.length) {
      this.allProjects = allProjects;
    } else {
      this.commonDataService.loadProjectsFromServer();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public confirmDelete(target: EmployeeModel) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this employee?',
      accept: () => {
        this.deleteEmployee(target);
      }
    });
  }

  public deleteEmployee(target: EmployeeModel) {
    const id_target = target.Id;

    this.backendService.deleteEmployee(id_target)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        this.employees.forEach((empl, i) => {
          if (target.Id === empl.Id) {
            this.employees.splice(i, 1);
          }
        });
        this.commonDataService.setEmployees(this.employees);
        this._employees = this.employees.slice();
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
      this.commonDataService.loadEmployeesFromServer();
    }
  }

  findByName() {
    const temp = [];
    const arr = this._employees.slice();

    if (this.input_find_by_name.length > 0) {
      arr.forEach((obj) => {
        if (obj && obj.FullName && obj.FullName.length) {
          if (~(obj.FullName.toLowerCase()).indexOf(this.input_find_by_name.toLowerCase())) {
            this.employees = this._employees.slice();
            this.employees.forEach(employee => {
              if (employee.Id === obj.Id) {
                temp.push(employee);
              }
            });
          }
        }
      });
      this.employees = temp;
    } else {
      this.employees = this._employees.slice();
    }
  }

}
