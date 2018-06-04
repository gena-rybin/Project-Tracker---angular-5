import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ProjectModel} from '../../../../models/project.model';
import {BackendService} from '../../../../services/backend.service';
import {DateTime} from 'luxon';

@Component({
  selector: 'pt-a-project-modal',
  templateUrl: './a-project-modal.component.html',
  styleUrls: ['./a-project-modal.component.css']
})
export class AProjectModalComponent implements OnDestroy {
  newProject = new ProjectModel();
  StartDate: Date;
  EndDate: Date;
  alive = true;

  @Input() displayDialog: boolean;
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
