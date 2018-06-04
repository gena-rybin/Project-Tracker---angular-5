import {TicketModel} from './ticket.model';

export class ProjectModel {
  Name?: string;
  Description?: string;
  CustomerName?: string;
  StartDate?: string;
  EndDate?: string;
  ImageUrl?: string;
  Tickets?: Array<TicketModel>;
  Id?: string;

  constructor(name?: string,
              description?: string,
              customerName?: string,
              startDate?: string,
              endDate?: string,
              imageUrl?: string,
              tickets?: Array<any>,
              id?: string) {

    this.Name = name;
    this.Description = description;
    this.CustomerName = customerName;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.ImageUrl = imageUrl;
    this.Tickets = tickets;
    this.Id = id;
  }
}
