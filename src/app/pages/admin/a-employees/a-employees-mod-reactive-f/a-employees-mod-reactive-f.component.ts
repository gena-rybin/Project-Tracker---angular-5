import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjectModel} from '../../../../models/project.model';
import {EmployeeModel} from '../../../../models/employee.model';
import {BackendService} from '../../../../services/backend.service';
import {ALL_LOCATIONS, ALL_POSITIONS, ALL_ROLES} from '../../../../models/const/app.constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'pt-a-employees-mod-reactive-form',
  templateUrl: './a-employees-mod-reactive-f.component.html',
  styleUrls: ['./a-employees-mod-reactive-f.component.css']
})
export class AEmployeesModReactiveFComponent implements OnInit, OnDestroy {
  newAdminEmployeeForm: FormGroup;

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

  constructor(public backendService: BackendService,
              private fb: FormBuilder) {
    this.showDialogToAdd();
  }

  ngOnInit() {
    this.initReactiveForm();
    console.log(this.newAdminEmployeeForm);
  }

  ngOnDestroy() {
    this.alive = false;
    this.displayDialogChange.emit(false);
  }

  initReactiveForm() {
    this.newAdminEmployeeForm = this.fb.group({
      name: ['emptyName', Validators.compose([Validators.required])],
      description: [null, Validators.compose([
        Validators.required, Validators.minLength(1), Validators.pattern(/^[А-яa-z0-9 ]+$/i)
      ])],
      customerName: [null, Validators.compose([Validators.required])],
      startDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
      imageUrl: [null],
      tickets: [[]],
      id: [null]
    });
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
