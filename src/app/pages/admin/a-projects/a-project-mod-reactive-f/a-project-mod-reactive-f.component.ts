 import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

import {ProjectModel} from '../../../../models/project.model';
import {BackendService} from '../../../../services/backend.service';
import {DateTime} from 'luxon';
import {TicketModel} from '../../../../models/ticket.model';

@Component({
  selector: 'pt-a-project-mod-reactive-form',
  templateUrl: './a-project-mod-reactive-f.component.html',
  styleUrls: ['./a-project-mod-reactive-f.component.css']
})
export class AProjectModReactiveFComponent implements OnInit, OnDestroy {
  newAdminProjectForm: FormGroup;
  newProject = new ProjectModel();
  StartDate: Date;
  EndDate: Date;
  alive = true;

  @Input() displayDialog: boolean;
  @Output() successSave = new EventEmitter<boolean>();
  @Output() displayDialogChange = new EventEmitter<boolean>();

  constructor(public backendService: BackendService,
              private fb: FormBuilder) {
    this.showDialogToAdd();
  }

  ngOnInit() {
    this.initReactiveForm();
    console.log(this.newAdminProjectForm);
  }

  ngOnDestroy() {
    this.alive = false;
    this.displayDialogChange.emit(false);
  }

  initReactiveForm() {
    this.newAdminProjectForm = this.fb.group({
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

  isControlInvalid(controlName: string): boolean {
    const control = this.newAdminProjectForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }

  showDialogToAdd() {
    this.newProject = new ProjectModel();
  }
  cancel() {
    this.newProject = new ProjectModel();
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
  }

  public save() {
    if (this.newAdminProjectForm.valid
      && (this.newAdminProjectForm.controls['startDate'].value < this.newAdminProjectForm.controls['endDate'].value)) {
      this.newAdminProjectForm.value.startDate = DateTime.fromJSDate(this.newAdminProjectForm.value.startDate).toISODate();
      this.newAdminProjectForm.value.endDate = DateTime.fromJSDate(this.newAdminProjectForm.value.endDate).toISODate();

      console.log(this.newAdminProjectForm.value);

      this.backendService.addProject(this.newAdminProjectForm.value)
        .takeWhile(() => this.alive)
        .subscribe(() => {
          this.successSave.emit(true);
          this.cancel();
        }, (err) => {
          console.log(err);
          this.successSave.emit(true);
          this.cancel();
        } );
    }
  }

}
