import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeModel} from '../../models/employee.model';
import {CommonDataService} from '../../services/common-data.service';
import {ProjectModel} from '../../models/project.model';
import {BackendService} from '../../services/backend.service';
import {ALL_LOCATIONS, ALL_POSITIONS, STATUS_TYPES} from '../../models/const/app.constants';

@Component({
  selector: 'pt-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  employee = new EmployeeModel();
  userProjects = Array<ProjectModel>(0);
  statusTypes = STATUS_TYPES;
  editLocation = false;
  allLocations = ALL_LOCATIONS;
  allPositions = ALL_POSITIONS;
  alive = true;

  constructor(public commonDataService: CommonDataService,
              public backendService: BackendService) {
    commonDataService.user$.subscribe((value: EmployeeModel) => {
      this.employee = value;
      this.getEmployeeProfile(this.employee.Id);
      this.commonDataService.loadUserProjectsFromServer(this.employee.Id);
    });

    commonDataService.userProjects$.subscribe((value: Array<ProjectModel>) => {
      this.userProjects = value;
      this.loadAllTicketsFromServer(this.userProjects);
    });
  }

  ngOnInit() {
    const getCurrentUser = this.commonDataService.getCurrentUser();
    if (getCurrentUser) {
      this.employee = getCurrentUser;
      this.getEmployeeProfile(this.employee.Id);
    } else {
      this.commonDataService.logout();
    }

    const userProjects = this.commonDataService.getUserProjects();
    if (userProjects && userProjects) {
      this.userProjects = userProjects;
      this.loadAllTicketsFromServer(this.userProjects);
    } else {
      this.commonDataService.loadUserProjectsFromServer(this.employee.Id);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public getEmployeeProfile(id: number) {
      this.backendService.getEmployee(id)
        .takeWhile(() => this.alive)
        .subscribe((res) => {
          this.employee = res;
          this.takeLocation();
          this.takePosition();
          this.commonDataService.loadUserProjectsFromServer(this.employee.Id);
        }, (err) => {
          console.log(err);
        } );
  }

  public editEmployeeProfile(employee: EmployeeModel) {
      this.backendService.editEmployee(employee)
        .takeWhile(() => this.alive)
        .subscribe((res) => {
          // this.employee = res;
        }, (err) => {
          console.log(err);
        } );
  }


  async loadAllTicketsFromServer(projects: Array<ProjectModel>) {
    const results = [];

    for (const p of projects) {
      results.push(await this.getProjectTicketsFromServer(+p.Id));
    }
  }

  public getProjectTicketsFromServer(projectId: number): void {
    this.backendService.getProjectTickets(projectId)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        if (res && res.length) {
          this.userProjects.forEach((project) => {
            const ProjectId = res[0].ProjectId;
            if (project.Id === ProjectId) {
              project.Tickets = res;

              project.Tickets.forEach((ticket) => {
                ticket.Status = this.statusTypes.filter((item) => item.id === ticket.StatusId)[0].name;
              });

              this.sortTicketsByStatusDescending(project);
            }
          });
        }
      }, (err) => {
        console.log(err);
      } );
  }

  public takeLocation() {
    if (this.employee.LocationId) {
      const name = this.allLocations.filter((item) => item.id === this.employee.LocationId)[0].name;
      this.employee.Location = {Name: name, Id: this.employee.LocationId};
    }
  }
  public takePosition() {
    if (this.employee.PositionId) {
      const name = this.allPositions.filter((item) => item.id === this.employee.PositionId)[0].name;
      this.employee.Position = {Name: name, Id: this.employee.PositionId};
    }
  }

  public sortTicketsByStatusDescending(project: ProjectModel) {
      project.Tickets.sort((a, b) => {
        return (a.StatusId - b.StatusId);
      });
  }

}
