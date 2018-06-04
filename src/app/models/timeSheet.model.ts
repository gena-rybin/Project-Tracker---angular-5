export class TimeSheetModel {
  LoggedTime?: number;
  Date?: string;
  TicketId?: number;
  Comment?: string;
  Id?: number;

  constructor(loggedTime?: number,
              date?: string,
              ticketId?: number,
              comment?: string,
              id?: number) {

    this.LoggedTime = loggedTime;
    this.Date = date;
    this.TicketId = ticketId;
    this.Comment = comment;
    this.Id = id;
  }
}
