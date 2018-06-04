import {ProjectModel} from './project.model';

export class EmployeeModel {
  First?: string;
  Last?: string;
  Birthday?: string;
  Email?: string;
  Password?: string;
  Address?: string;
  Skype?: string;
  Phone?: string;
  ImageUrl?: string;
  PositionId?: number;
  Position?: {Name: string, Id: number};
  LocationId?: number;
  Location?: {Name: string, Id: number};
  Projects?: Array<number>;
  Roles?: Array<any>;
  FullName?: string;
  Id?: number;

  constructor(First?: string,
              Last?: string,
              Birthday?: string,
              Email?: string,
              Password?: string,
              Address?: string,
              Skype?: string,
              Phone?: string,
              ImageUrl?: string,
              PositionId?: number,
              Position?: {Name: string, Id: number},
              LocationId?: number,
              Location?: {Name: string, Id: number},
              Projects?: Array<number>,
              Roles?: Array<any>,
              FullName?: string,
              Id?: number) {

    this.First = First;
    this.Last = Last;
    this.Birthday = Birthday;
    this.Email = Email;
    this.Password = Password;
    this.Address = Address;
    this.Skype = Skype;
    this.Phone = Phone;
    this.ImageUrl = ImageUrl;
    this.PositionId = PositionId;
    this.Position = Position;
    this.LocationId = LocationId;
    this.Location = Location;
    this.Projects = Projects;
    this.Roles = Roles;
    this.FullName = FullName;
    this.Id = Id;
  }
}
