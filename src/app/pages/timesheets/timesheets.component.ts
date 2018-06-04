import {Component, OnDestroy, OnInit} from '@angular/core';
// import * as moment from 'moment';
import {TicketModel} from '../../models/ticket.model';
import {ProjectModel} from '../../models/project.model';
import {CommonDataService} from '../../services/common-data.service';
import {BackendService} from '../../services/backend.service';
import {ChangeDetectorRef} from '@angular/core';
import {TimeSheetModel} from '../../models/timeSheet.model';
import {OverlayPanel} from 'primeng/primeng';
import {EmployeeModel} from '../../models/employee.model';
import {DateTime} from 'luxon';

export class WeekDaysObjClass {
  dayString: string;
  dayMMDDYYYY: string;

  constructor(dayString: string,
              dayMMDDYYYY: string) {

    this.dayString = dayString;
    this.dayMMDDYYYY = dayMMDDYYYY;
  }
}

@Component({
  selector: 'pt-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit, OnDestroy {
  // _today = moment().format('MM-DD-YYYY');
  _today = DateTime.local().toFormat('MM-dd-y');
  timesheet = new TimeSheetModel();
  comment = '';
  employee = new EmployeeModel();
  loggedTime: number;
  week: number;
  week_current: number;
  days_week_current = [];
  projects = Array<ProjectModel>(0);
  projects_tickets = Array<{
        project: ProjectModel,
        tickets: Array<TicketModel>,
        timesheets: Array<TimeSheetModel>
  }>(0);
  project_current = new ProjectModel();
  ticket_current = new TicketModel();
  tickets = Array<TicketModel>(0);
  displayDialog = false;
  editMode = false;
  rerender = false;
  previousTimesheet = 0;
  totalHoursInCurrentDay = 0;
  c1 = 0;
  c2 = 0;
  alive = true;

  constructor(public commonDataService: CommonDataService,
              public backendService: BackendService,
              public cd: ChangeDetectorRef) {
    commonDataService.user$.subscribe((value: EmployeeModel) => {
      this.employee = value;

      const getUserProjects = this.commonDataService.getUserProjects();
      if (getUserProjects && getUserProjects.length) {
        this.projects = getUserProjects;
        this.loadAllTicketsFromServer(this.projects);
      } else {
        this.commonDataService.loadUserProjectsFromServer(this.employee.Id);
      }
    });

    commonDataService.userProjects$.subscribe((value: Array<ProjectModel>) => {
      this.projects = value;
      this.loadAllTicketsFromServer(this.projects);
    });
  }

  ngOnInit() {
    this.setStartingCalendar();

    const getCurrentUser = this.commonDataService.getCurrentUser();
    if (getCurrentUser) {
      this.employee = getCurrentUser;
    } else {
      this.commonDataService.logout();
    }

    const projects = this.commonDataService.getUserProjects();
    if (projects && projects.length) {
      this.projects = projects;
      this.loadAllTicketsFromServer(this.projects);
    } else {
      this.commonDataService.loadUserProjectsFromServer(this.employee.Id);
    }

  }
  ngOnDestroy() {
    this.alive = false;
  }

  async loadAllTicketsFromServer(projects: Array<ProjectModel>) {
    const results = [];

    for (const p of projects) {
      results.push(await this.getProjectTicketsFromServer(+p.Id));
    }
    results.forEach((result, i) => {
      this.projects_tickets.push({
        project: projects[i],
        tickets: undefined,
        timesheets: undefined,
      });
    });
  }
  public count() {
    // console.log('came from server ', this.c2);
    if (!this.c1) {
      this.projects.forEach((project) => {
        project.Tickets.forEach((ticket) => {
          this.c1 += ticket.TimeSheets.length;
        });
      });
    }
  }

  public getProjectTicketsFromServer(projectId: number): void {
    this.backendService.getProjectTickets(projectId)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        if (res && res.length) {
          this.projects_tickets.forEach((p) => {
            const ProjectId = res[0].ProjectId;
            if (p.project.Id === ProjectId) {
              p.tickets = res;
            }
          });
          this.projects.forEach((p) => {
            const ProjectId = res[0].ProjectId;
            if (p.Id === ProjectId) {
              p.Tickets = res;
            }
          });
        }
        this.getTimesheetsFromServerByProjId(projectId);
      }, (err) => {
        console.log(err);
      } );
  }

  public getTimesheetsFromServerByProjId(projectId: number): void {
    this.backendService.getTimesheetsByProjId(projectId)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        const result = <Array<TimeSheetModel>>res;
        this.c2 += res.length;
        if (res && res.length && this.projects_tickets && this.projects_tickets.length) {
          this.projects_tickets.forEach((p) => {
            if (+p.project.Id === projectId) {
              p.timesheets = res;
            }
          });
          this.projects.forEach((project) => {
            if (+project.Id === projectId) {
              project.Tickets.forEach((ticket) => {
                result.forEach((timesheetFromServer, i) => {
                  if (timesheetFromServer.TicketId === ticket.Id) {
                    ticket.TimeSheets.push(timesheetFromServer);
                  }
                });
              });
            }
          });
        }
      }, (err) => {
        console.log(err);
      } );
  }

  showTimesheetForCurrentDate(timesheets: Array<TimeSheetModel>, dayMMDDYYYY: string): any {
    let loggedTime = 0;
    timesheets.forEach((timesheet) => {
      // const _dayMMDDYYYY = moment(timesheet.Date).format('MM-DD-YYYY');
      const _dayMMDDYYYY = DateTime.fromISO(timesheet.Date).toFormat('MM-dd-yyyy');
      const comparisonResult = dayMMDDYYYY.localeCompare(_dayMMDDYYYY);
      if (comparisonResult === 0) { loggedTime += +timesheet.LoggedTime; }
    });
    return (loggedTime > 0) ? ('' + loggedTime) : '';
  }

  showCommentForTimesheet(timesheets: Array<TimeSheetModel>, dayMMDDYYYY: string): string {
    let comment = '';
    timesheets.forEach((timesheet) => {
      // const _dayMMDDYYYY = moment(timesheet.Date).format('MM-DD-YYYY');
      const _dayMMDDYYYY = DateTime.fromISO(timesheet.Date).toFormat('MM-dd-yyyy');
      const comparisonResult = dayMMDDYYYY.localeCompare(_dayMMDDYYYY);
      if (comparisonResult === 0) { comment = (timesheet.Comment.length > 0) ? timesheet.Comment : ''; }
    });
    return comment;
  }

  showTotalLoggedTime(tickets: Array<TicketModel>, dayMMDDYYYY: string): number {
    let totalLoggedTime = 0;
    tickets.forEach((ticket) => {
      if (+ticket.StatusId !== 5) {
        ticket.TimeSheets.forEach((timesheet) => {
          // const _dayMMDDYYYY = moment(timesheet.Date).format('MM-DD-YYYY');
          const _dayMMDDYYYY = DateTime.fromISO(timesheet.Date).toFormat('MM-dd-y');
          const comparisonResult = dayMMDDYYYY.localeCompare(_dayMMDDYYYY);
          if (comparisonResult === 0) { totalLoggedTime += timesheet.LoggedTime; }

        });
      }
    });
    return totalLoggedTime;
  }

  selectComment(e, overlaypanel: OverlayPanel, timesheets: Array<TimeSheetModel>, dayMMDDYYYY: string) {
    this.comment = this.showCommentForTimesheet(timesheets, dayMMDDYYYY);
    if (this.comment) { overlaypanel.toggle(event); }
  }

  setStartingCalendar(): void {
    // this.week = moment(new Date()).week();
    this.week = +DateTime.local().toFormat('W');
    this.week_current = this.week;
    this.fillCurrentWeekDays(this.week_current);
  }

  fillCurrentWeekDays(week: number): void {
    for (let i = 1; i < 7; i++) {
      // const dayString = moment().week(week).weekday(i).format('DD/MM');
      const dayString = DateTime.local().set({weekNumber: week, weekday: i}).toFormat('dd/MM');
      // const dayMMDDYYYY = moment().week(week).weekday(i).format('MM-DD-YYYY');
      const dayMMDDYYYY = DateTime.local().set({weekNumber: week, weekday: i}).toFormat('MM-dd-y');
      this.days_week_current.push( new WeekDaysObjClass(dayString, dayMMDDYYYY));
    }
  }

  nextWeekClicked(): void {
    this.days_week_current = [];
    this.week_current++;
    this.fillCurrentWeekDays(this.week_current);
  }

  prevWeekClicked(): void {
    this.days_week_current = [];
    this.week_current--;
    this.fillCurrentWeekDays(this.week_current);
  }

  pointToCurrentDay(dayToCheck: string): boolean {
    const result = this._today.localeCompare(dayToCheck);
    return (result === 0) ? true : false;
  }

  showDialogToAdd(project_current: ProjectModel, dayMMDDYYYY: string, ticket: TicketModel, loggedTime?: number) {
    this.totalHoursInCurrentDay = this.countTotalHoursInCurrentDay(dayMMDDYYYY);

    console.log(loggedTime);
    const timesheets = ticket.TimeSheets;
    let timesheetId: number;
    let comment: string;
    this.editMode = false;

    timesheets.forEach((timesheet) => {
        // const _dayMMDDYYYY = moment(timesheet.Date).format('MM-DD-YYYY');
        const _dayMMDDYYYY = DateTime.fromISO(timesheet.Date).toFormat('MM-dd-y');
        const comparisonResult = dayMMDDYYYY.localeCompare(_dayMMDDYYYY);
        if (comparisonResult === 0) {
          timesheetId = +timesheet.Id;
          comment = timesheet.Comment;
          this.previousTimesheet = timesheet.LoggedTime;
          console.log(this.previousTimesheet);
          this.editMode = true;
        }
    });
    this.timesheet = new TimeSheetModel(+loggedTime,
                                        dayMMDDYYYY,
                                        ticket.Id,
                                        (comment) ? comment : '',
                                        (timesheetId) ? timesheetId : undefined);
    this.project_current = project_current;
    this.ticket_current = ticket;

    this.displayDialog = true;
  }

  countTotalHoursInCurrentDay(dayMMDDYYYY: string): number {
    let totalHours = 0;

    const elements = Array.from(document.querySelectorAll('[id^="total_' + dayMMDDYYYY + '"]'));
    elements.forEach((el) => {
      totalHours += +(<HTMLInputElement>el).value;
    });
    return totalHours;
  }

  successSaveHandler(successSave: boolean) {
    this.getTimesheetsByTicketFromServerById(this.timesheet.TicketId);
  }

  public getTimesheetsByTicketFromServerById(ticketId: number): void {
    this.backendService.getTicket(ticketId)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        if (res && res.length) {
          this.projects.forEach((project) => {
            if (+project.Id === +this.project_current.Id) {
              project.Tickets.forEach((ticket) => {
                  if (ticket.Id === ticketId) {
                      this.rerender = true;
                      ticket.TimeSheets = [];
                      ticket.TimeSheets = res;
                      this.cd.detectChanges();
                    this.rerender = false;
                  }
              });
            }
          });
        }
      }, (err) => {
        console.log(err);
      } );
  }

}
