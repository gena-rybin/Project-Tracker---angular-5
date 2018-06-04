import {environment } from '../../../environments/environment';

export class UrlParams {

  // private static baseUrl = 'http://aac-vm.universe.dart.spb:8080/api/';
  private static baseUrl = environment.apiUrl;

  // private static baseUrl = 'http://aac-vm.universe.dart.spb:8080/api/';
  private static loginURL = 'employees/login';
  private static employeesUrl = 'employees';
  private static projectsUrl = 'projects';
  private static skillsUrl = 'skills';
  private static tasksUrl = 'tasks';
  private static teamUrl = 'team';
  private static timesheetsUrl = 'timesheets';

  public static get homeUrl(): string {
    return UrlParams.baseUrl;
  }

  // public static get homeUrl(): string {
  //   return `${UrlParams.baseUrl}`;
  // }

  public static get login(): string {
    return UrlParams.baseUrl + `${UrlParams.loginURL}`;
  }
  public static get employees(): string {
    return UrlParams.baseUrl + `${UrlParams.employeesUrl}`;
  }

  public static get projects(): string {
    return UrlParams.baseUrl + `${UrlParams.projectsUrl}`;
  }

  public static get skills(): string {
    return UrlParams.baseUrl + `${UrlParams.skillsUrl}`;
  }

  public static get tasks(): string {
    return UrlParams.baseUrl + `${UrlParams.tasksUrl}`;
  }

  public static get team(): string {
    return UrlParams.baseUrl + `${UrlParams.teamUrl}`;
  }

  public static get timesheets(): string {
    return UrlParams.baseUrl + `${UrlParams.timesheetsUrl}`;
  }

}
