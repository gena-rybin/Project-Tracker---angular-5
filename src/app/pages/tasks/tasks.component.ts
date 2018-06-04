import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonDataService} from '../../services/common-data.service';
import {ProjectModel} from '../../models/project.model';
import {BackendService} from '../../services/backend.service';
import {STATUS_TYPES} from '../../models/const/app.constants';
import {StaticDataModel} from '../../models/static-data.model';
import {TicketModel} from '../../models/ticket.model';
import {NgDragDropService} from 'ng-drag-drop/src/services/ng-drag-drop.service';
import {EmployeeModel} from '../../models/employee.model';

@Component({
  selector: 'pt-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  displayDialog = false;
  projects = Array<ProjectModel>(0);
  employees = Array<EmployeeModel>(0);
  project_current = new ProjectModel();
  ticket = new TicketModel();
  tickets = Array<TicketModel>(0);
  editMode = false;
  alive = true;
  status_types = <Array<StaticDataModel>>STATUS_TYPES;

  constructor(public commonDataService: CommonDataService,
              public backendService: BackendService,
              public ngDragDropService: NgDragDropService) {
    commonDataService.projects$.subscribe((value: Array<ProjectModel>) => {
      this.projects = value;
    });
    commonDataService.employees$.subscribe((value: Array<EmployeeModel>) => {
      this.employees = value;
    });

  }

  ngOnInit() {
    const projects = this.commonDataService.getProjects();
    if (projects && projects.length) {
      this.projects = projects;
    } else {
      this.commonDataService.loadProjectsFromServer();
    }

    const employees = this.commonDataService.getEmployees();
    if (employees && employees.length) {
      this.employees = employees;
    } else {
      this.commonDataService.loadEmployeesFromServer();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  showDialogToAdd() {
    this.ticket = new TicketModel();
    this.ticket.Project = this.project_current;
    this.ticket.ProjectId = +this.project_current.Id;

    this.displayDialog = true;
    this.editMode = false;
  }
  showDialogToEdit(ticket: TicketModel) {
    this.ticket = ticket;
    this.displayDialog = true;
    this.editMode = true;
  }

  successSaveHandler(successSave: boolean) {
    if (successSave) {
      if (this.project_current && +this.project_current.Id > 0) {
        this.getProjectTicketsFromServer(+this.project_current.Id);
      }
    }
  }

  setActiveProject(project: ProjectModel, e: any) {
    this.navToggleProjectActivityFunction(+project.Id);

    this.project_current = project;
    this.getProjectTicketsFromServer(+project.Id);
  }

  public getProjectTicketsFromServer(id: number): void {
    this.backendService.getProjectTickets(id)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        let _tickets = Array<TicketModel>(0);
        _tickets = res;
        _tickets.forEach((t) => {
          t.Responsible = (this.employees.filter((e) => e.Id === t.ResponsibleId))[0];
        });
        this.tickets = _tickets;
      }, (err) => {
        console.log(err);
      } );
  }

  onItemDrop(e: any, ticket: TicketModel, statusId: number) {
    this.ticket = ticket;
    this.ticket.StatusId = statusId;
    if (!this.ticket.ReporterId) { this.ticket.ReporterId = this.commonDataService.getCurrentUser().Id; }
    if (!this.ticket.ResponsibleId) { this.ticket.ResponsibleId = this.commonDataService.getCurrentUser().Id; }

      this.backendService.editTicket(this.ticket)
        .takeWhile(() => this.alive)
        .subscribe((res) => {
        }, (err) => {
          console.log(err);
        } );
  }

  public navToggleProjectActivityFunction(id: number) {
    const proj_current = document.getElementById('proj__' + id);
    const proj_class = proj_current.className;

    const projs_items: NodeListOf<Element> = document.querySelectorAll('[id^="proj__"]');
    for (let i = 0; i < projs_items.length; i++) {
      if (projs_items[i].className === 'nav-link button-proj-name') {continue; }
      projs_items[i].className = 'nav-link button-proj-name';
    }
    proj_current.classList.add('active');
  }
}
