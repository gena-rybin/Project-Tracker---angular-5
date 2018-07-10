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
          Validators.required, Validators.minLength(1), Validators.pattern(/[А-я]/)
      ])],
      customerName: [null],
      startDate: [null, Validators.compose([Validators.required])],
      endDate: [null, Validators.compose([Validators.required])],
      imageUrl: [null],
      tickets: [[]],
      id: [null]
    });
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
    if (this.StartDate && this.EndDate && (this.StartDate < this.EndDate)) {
      this.newProject.StartDate = DateTime.fromJSDate(this.StartDate).toISODate();
      this.newProject.EndDate = DateTime.fromJSDate(this.EndDate).toISODate();

      this.backendService.addProject(this.newProject)
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
