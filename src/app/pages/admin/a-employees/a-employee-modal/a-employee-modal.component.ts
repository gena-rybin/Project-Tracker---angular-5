import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {EmployeeModel} from '../../../../models/employee.model';
import {ProjectModel} from '../../../../models/project.model';
import {BackendService} from '../../../../services/backend.service';
import {ALL_LOCATIONS, ALL_POSITIONS, ALL_ROLES} from '../../../../models/const/app.constants';

@Component({
  selector: 'pt-a-employee-modal',
  templateUrl: './a-employee-modal.component.html',
  styleUrls: ['./a-employee-modal.component.css']
})
export class AEmployeeModalComponent implements OnDestroy {
  newEmployees = new EmployeeModel();
  allLocations = ALL_LOCATIONS;
  currentLocation = 3;
  currentProjectId: number;
  alive = true;
  allPositions = ALL_POSITIONS;
  currentPosition = 2;
  allRoles = ALL_ROLES;
  currentRole = 2;

  @Input() displayDialog: boolean;
  @Input() allProjects: Array<ProjectModel>;

  @Output() successSave = new EventEmitter<boolean>();
  @Output() displayDialogChange = new EventEmitter<boolean>();

  constructor(public backendService: BackendService) {
    this.showDialogToAdd();
  }

  ngOnDestroy() {
    this.alive = false;
    this.displayDialogChange.emit(false);
  }

  showDialogToAdd() {
    this.newEmployees = new EmployeeModel();
    this.newEmployees.LocationId = +this.currentLocation;
    this.newEmployees.Birthday = '2018-04-18T07:21:01.477Z';
    this.newEmployees.ImageUrl = 'undefined';
    this.newEmployees.Password = '111111';
  }
  cancel() {
    this.newEmployees = new EmployeeModel();
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
  }

  public save() {
    this.newEmployees.LocationId = +this.currentLocation;
    this.newEmployees.Projects = [];
    this.newEmployees.Projects.push(+this.currentProjectId);
    this.newEmployees.Roles = [];
    this.newEmployees.Roles.push(+this.currentRole);
    this.newEmployees.PositionId = +this.currentPosition;

    this.backendService.addEmployee(this.newEmployees)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        this.successSave.emit(true);
        this.cancel();
      }, (err) => {
        console.log(err);
      } );

  }

}
