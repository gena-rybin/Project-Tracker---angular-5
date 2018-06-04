import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {BackendService} from '../../../services/backend.service';
import {TicketModel} from '../../../models/ticket.model';
import {CommonDataService} from '../../../services/common-data.service';
import {ProjectModel} from '../../../models/project.model';
import {EmployeeModel} from '../../../models/employee.model';
import {STATUS_TYPES, TICKET_TYPES} from '../../../models/const/app.constants';
// import * as moment from 'moment';
import {ConfirmationService} from 'primeng/api';
import {DateTime} from 'luxon';

@Component({
  selector: 'pt-new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})


export class NewTaskModalComponent implements OnInit, OnDestroy {
  user: EmployeeModel;
  newTicket = new TicketModel();
  employees = Array<EmployeeModel>(0);
  projects = Array<ProjectModel>(0);
  alive = true;
  statusTypes = STATUS_TYPES;
  default_statusId = 2;
  default_ticketType = 2;
  current_statusId = this.default_statusId; // leave
  current_projectId: number;
  ticketTypes = TICKET_TYPES;
  StartDate: Date;

  @Input() set ticket(value: TicketModel) {
    if (value && value.Id) { // edit mode
      this.newTicket = value;
      this.sortEmployeesDescending();
      this.newTicket.Project = this.projects.filter((item) => +item.Id === value.ProjectId)[0];
      this.current_projectId = +this.newTicket.Project.Id;
      this.newTicket.Responsible = this.employees.filter((item) => item.Id === value.ResponsibleId)[0];
      this.newTicket.Reporter = this.employees.filter((item) => item.Id === value.ResponsibleId)[0];
      this.current_statusId = this.newTicket.StatusId; // leave
      this.newTicket.Status = this.statusTypes.filter((item) => item.id === value.StatusId)[0].name;
      this.newTicket.TicketType = this.ticketTypes.filter((item) => item.id === value.TypeId)[0].name;

      const _startDate = this.newTicket.StartDate ? new Date(this.newTicket.StartDate) : undefined;
      this.StartDate = _startDate;
    } else { // create new
      this.newTicket = new TicketModel();
      this.sortEmployeesDescending();
      this.current_statusId = this.default_statusId;
      this.newTicket.TypeId = this.default_ticketType;
      this.newTicket.Project = value.Project;
      this.newTicket.ProjectId = value.ProjectId;
      this.current_projectId = value.ProjectId;
      if (this.user) { this.newTicket.ResponsibleId = this.user.Id; }
    }
  }
  @Input() displayDialog: boolean;
  @Input() editMode: boolean;
  @Output() successSave = new EventEmitter<boolean>();
  @Output() displayDialogChange = new EventEmitter<boolean>();

  constructor(public commonDataService: CommonDataService,
              public backendService: BackendService,
              private confirmationService: ConfirmationService) {
    this.showDialogToAdd();
    commonDataService.user$.subscribe((value: EmployeeModel) => {
      this.user = value;
      if (this.newTicket) { this.newTicket.ResponsibleId = this.user.Id; }
    });

    commonDataService.projects$.subscribe((value: Array<ProjectModel>) => {
      this.projects = value;
    });

    commonDataService.employees$.subscribe((value: Array<EmployeeModel>) => {
      this.employees = value;
      this.sortEmployeesDescending();
    });
  }

  ngOnInit() {
    if (this.commonDataService.getCurrentUser()) {
      this.user = this.commonDataService.getCurrentUser();
      if (this.newTicket) { this.newTicket.ResponsibleId = this.user.Id; }
    } else {
      this.commonDataService.logout();
    }

    const employees = this.commonDataService.getEmployees();
    if (employees && employees.length) {
      this.employees = employees;
    } else {
      this.commonDataService.loadEmployeesFromServer();
    }

    const projects = this.commonDataService.getProjects();
    if (projects && projects.length) {
      this.projects = projects;
    } else {
      this.commonDataService.loadProjectsFromServer();
    }
  }


  ngOnDestroy() {
    this.alive = false;
    this.displayDialogChange.emit(false);
  }

  showDialogToAdd() {
    this.newTicket = new TicketModel();
    // this.newTicket.StartDate = moment().utc().format();
    // this.newTicket.EndDate = '2019-04-19T07:21:01.477Z';

    // const now = DateTime.local();
    // console.log(DateTime.fromISO(now.toISO()).setLocale('fr').toLocaleString(DateTime.DATETIME_FULL));
    // this.newTicket.StartDate = now.toISO();
    // this.newTicket.EndDate = now.plus({ months: 2 }).toISO();
    this.newTicket.TimeSheets = [];
  }
  cancel() {
    this.displayDialog = false;
    this.displayDialogChange.emit(false);
    this.current_projectId = undefined;
  }

  takeDataFromSelects(): void {
    // this.newTicket.StartDate = moment().utc().format();
    this.newTicket.StartDate = DateTime.fromJSDate(this.StartDate).toISODate();
    this.newTicket.StatusId = +this.current_statusId; // leave
    this.newTicket.Status = (this.statusTypes.filter(item => {
      return +item.id === +this.current_statusId;
    }))[0].name;
    this.newTicket.TicketType = this.newTicket.TypeId;
    this.newTicket.Responsible = (this.employees.filter(item => {
      return +item.Id === +this.newTicket.ResponsibleId;
    }))[0];
    if (this.editMode) { // edit mode

    } else { // create new
      this.newTicket.Reporter = this.user;
      this.newTicket.ReporterId = +this.user.Id;
      this.newTicket.ProjectId = +this.current_projectId;
      this.newTicket.Project = (this.projects.filter(item => {
        return +item.Id === +this.current_projectId;
      }))[0];
    }
    if (!this.newTicket.ReporterId) { this.newTicket.ReporterId = this.commonDataService.getCurrentUser().Id; }
    if (!this.newTicket.ResponsibleId) { this.newTicket.ResponsibleId = this.commonDataService.getCurrentUser().Id; }
  }

  public save() {
    this.takeDataFromSelects();

      this.backendService.addTicket(this.newTicket)
        .takeWhile(() => this.alive)
        .subscribe((res) => {
          this.successSave.emit(true);
          this.cancel();
        }, (err) => {
          console.log(err);
          this.successSave.emit(true);
          this.cancel();
        } );
  }

  public editTask() {
    this.takeDataFromSelects();

      this.backendService.editTicket(this.newTicket)
        .takeWhile(() => this.alive)
        .subscribe((res) => {
          this.successSave.emit(true);
          this.cancel();
        }, (err) => {
          console.log(err);
          this.successSave.emit(true);
          this.cancel();
        } );
  }

  public confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deleteTask();
      }
    });
  }

  public deleteTask() {
    this.backendService.deleteTicket(this.newTicket.Id)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        this.successSave.emit(true);
        this.cancel();
      }, (err) => {
        console.log(err);
        this.successSave.emit(true);
        this.cancel();
      } );
  }

  public sortEmployeesDescending() {
    this.employees.sort((a, b) => {
      if (a.Position.Name < b.Position.Name) {return -1; }
      if (a.Position.Name > b.Position.Name) {return 1; }
      return 0;
    });
  }

}
