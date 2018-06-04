import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ProjectModel} from '../../../models/project.model';
import {BackendService} from '../../../services/backend.service';
import {TicketModel} from '../../../models/ticket.model';
import {CommonDataService} from '../../../services/common-data.service';
import {TimeSheetModel} from '../../../models/timeSheet.model';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'pt-new-time-modal',
  templateUrl: './new-time-modal.component.html',
  styleUrls: ['./new-time-modal.component.css']
})
export class NewTimeModalComponent implements OnDestroy {
  _timesheet = new TimeSheetModel();
  maxHoursPerDay = 24;
  hoursCountOverLimit = 0;
  hoursMessageOverLimit = '';
  alive = true;

  @ViewChild('loggedTime') loggedTimeInput: any;
  @ViewChild('comment') commentTextarea: any;

  @Input() previousTimesheet: number;
  @Input() totalHoursInCurrentDay: number;
  @Input() set timesheet(value: TimeSheetModel) {
    // console.log(value);
    if (value && value.Id > 0) { // edit timesheet
      this._timesheet = value;
      this._timesheet.LoggedTime = (+value.LoggedTime > 0) ? +value.LoggedTime : undefined;
    } else {                     // new timesheet
      this._timesheet = new TimeSheetModel((+value.LoggedTime > 0) ? +value.LoggedTime : 0,
                                            value.Date, value.TicketId, '', undefined);
      this.previousTimesheet = 0;
    }
    this.doExistFreeTimeForLogging();
    setTimeout(() => { this.loggedTimeInput.nativeElement.focus(); }, 10);
  }
  get timesheet() { return this._timesheet; }
  @Input()project_current: ProjectModel;
  @Input()ticket_current: TicketModel;

  @Input() displayDialog: boolean;
  @Input() editMode: boolean;
  @Output() successSave = new EventEmitter<boolean>();
  @Output() displayDialogChange = new EventEmitter<boolean>();

  constructor(public commonDataService: CommonDataService,
              public backendService: BackendService,
              private confirmationService: ConfirmationService) {}



  ngOnDestroy() {
    this.alive = false;
    this.displayDialogChange.emit(false);
  }

  cancel() {
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
    this.successSave.emit(false);
    // this._timesheet = new TimeSheetModel();
  }

  public save() {
    if (this.doExistFreeTimeForLogging()) {
         this.backendService.addTimesheet(this._timesheet)
          .takeWhile(() => this.alive)
          .subscribe(() => {
            this.successSave.emit(true);
            this.cancel();
          }, (err) => {
            console.log(err);
            this.successSave.emit(true);
            this.cancel();
          });
    }
  }

  doExistFreeTimeForLogging(): boolean {
    // console.log(this._timesheet);
    const loggedTime = Number.isInteger(+this._timesheet.LoggedTime) ? +this._timesheet.LoggedTime : 0;
    const totalHoursInCurrentDay = this.totalHoursInCurrentDay - this.previousTimesheet;
    const existBoolean = (totalHoursInCurrentDay + loggedTime) <= this.maxHoursPerDay;

    // console.log('totalHoursInCurrentDay=' + totalHoursInCurrentDay + '='
    //             + this.totalHoursInCurrentDay + '-' + this.previousTimesheet
    //             + ' + ' + 'loggedTime=' + loggedTime + ' <= 24');

    this.hoursCountOverLimit = (totalHoursInCurrentDay + loggedTime) - this.maxHoursPerDay;
    this.hoursMessageOverLimit = 'You can\'t logg-in more then ' + this.maxHoursPerDay
                                  + 'h per day. Overlimit is '
                                  + (Number.isInteger(this.hoursCountOverLimit) ? this.hoursCountOverLimit : 0) + '.';
    // console.log((totalHoursInCurrentDay + loggedTime), existBoolean);

    return existBoolean;
  }

  public editTimesheet() {
    if (this.doExistFreeTimeForLogging()) {
        this.backendService.editTimesheet(this._timesheet)
          .takeWhile(() => this.alive)
          .subscribe(() => {
            this.successSave.emit(true);
            this.cancel();
          }, (err) => {
            console.log(err);
            this.successSave.emit(true);
            this.cancel();
          });
    }
  }

  public confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this timesheet?',
      accept: () => {
        this.deleteTimesheet();
      }
    });
  }

  public deleteTimesheet() {
    this.backendService.deleteTimesheet(this._timesheet.Id)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.successSave.emit(true);
        this.cancel();
      }, (err) => {
        console.log(err);
      } );
  }

}
