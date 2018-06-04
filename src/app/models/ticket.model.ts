import {ProjectModel} from './project.model';
import {EmployeeModel} from './employee.model';
import {TimeSheetModel} from './timeSheet.model';

export class TicketModel {
  Name?: string;
  Description?: string;
  Estimate?: number;
  StartDate?: string;
  EndDate?: string;
  StatusId?: number;
  Status?: any;
  ResponsibleId?: number;
  Responsible?: EmployeeModel;
  TypeId?: number;
  TicketType?: any;
  ProjectId?: number;
  Project?: ProjectModel;
  ReporterId?: number;
  Reporter?: EmployeeModel;
  TimeSheets?: Array<TimeSheetModel>;
  Id?: number;

  constructor(name?: string,
              description?: string,
              estimate?: number,
              startDate?: string,
              endDate?: string,
              statusId?: number,
              status?: any,
              responsibleId?: number,
              responsible?: EmployeeModel,
              typeId?: number,
              ticketType?: any,
              projectId?: number,
              project?: ProjectModel,
              reporterId?: number,
              reporter?: EmployeeModel,
              timeSheets?: Array<any>,
              id?: number) {

    this.Name = name;
    this.Description = description;
    this.Estimate = estimate;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.StatusId = statusId;
    this.Status = status;
    this.ResponsibleId = responsibleId;
    this.Responsible = responsible;
    this.TypeId = typeId;
    this.TicketType = ticketType;
    this.ProjectId = projectId;
    this.Project = project;
    this.ReporterId = reporterId;
    this.Reporter = reporter;
    this.TimeSheets = timeSheets;
    this.Id = id;
  }
}
