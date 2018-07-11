import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjectModel} from '../../../../models/project.model';
import {EmployeeModel} from '../../../../models/employee.model';
import {BackendService} from '../../../../services/backend.service';
import {ALL_LOCATIONS, ALL_POSITIONS, ALL_ROLES} from '../../../../models/const/app.constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'pt-a-employees-mod-reactive-form',
  templateUrl: './a-employees-mod-reactive-f.component.html',
  styleUrls: ['./a-employees-mod-reactive-f.component.css']
})
export class AEmployeesModReactiveFComponent implements OnInit, OnDestroy {
  newAdminEmployeeForm: FormGroup;
  private locationSubscription: Subscription;
  initialBirthday = '2018-04-18T07:21:01.477Z';

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
      First: [null, Validators.compose([Validators.required])],
      Last: [null, Validators.compose([Validators.required])],
      Birthday: [this.initialBirthday],
      Email: [null, Validators.compose([Validators.required])],
      Password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      Address: [null, Validators.compose([Validators.required])],
      Skype: [null, Validators.compose([Validators.required])],
      Phone: [null, Validators.compose([Validators.required])],
      ImageUrl: [null],
      PositionId: [this.currentPosition],
      Position: [{
        Name: this.allPositions.filter(p => +p.id === this.currentPosition)[0].name,
        Id: this.currentPosition
      }, Validators.compose([Validators.required])],
      LocationId: [this.currentLocation],
      Location: [{
        Name: this.allLocations.filter(l => +l.id === +this.currentLocation)[0].name,
        Id: this.currentLocation
      }, Validators.compose([Validators.required])],
      Projects: [[]],
      Roles: [[this.currentRole]],
      FullName: [null],
      Id: [null]
    });
  }

  fillLocation(id: number) {
    this.newAdminEmployeeForm.value.LocationId = +id;
    this.newAdminEmployeeForm.value.Location.Id = +id;
    const location = this.allLocations.filter(l => +l.id === +id)[0];
    this.newAdminEmployeeForm.value.Location['Name'] = location ? location.name : '';
  }
  fillPosition(id: number) {
    this.newAdminEmployeeForm.value.PositionId = +id;
    this.newAdminEmployeeForm.value.Position.Id = +id;
    const position = this.allPositions.filter(p => +p.id === +id)[0];
    this.newAdminEmployeeForm.value.Position['Name'] = position ? position.name : '';
  }
  fillRole(id: number) {
    this.newAdminEmployeeForm.value.Roles = [+id];
  }
  fillProjects(id: number) {
    this.newAdminEmployeeForm.value.Projects = [+id];
  }

  showDialogToAdd() {
    this.newEmployees = new EmployeeModel();
    this.newEmployees.LocationId = +this.currentLocation;
    this.newEmployees.Birthday = this.initialBirthday;
    this.newEmployees.ImageUrl = 'undefined';
    this.newEmployees.Password = '111111';
  }
  cancel() {
    this.newEmployees = new EmployeeModel();
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
  }

  public save() {
    if (this.newAdminEmployeeForm.valid) {
      this.backendService.addEmployee(this.newAdminEmployeeForm.value)
        .takeWhile(() => this.alive)
        .subscribe((res) => {
          this.successSave.emit(true);
          this.cancel();
        }, (err) => {
          console.log(err);
        } );
    }
  }

}
