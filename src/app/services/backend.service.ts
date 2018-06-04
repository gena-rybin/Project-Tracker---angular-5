import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';

import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {UrlParams} from '../models/const/URL_PARAMS';
import {API_KEY} from '../models/const/app.constants';
import {EmployeeModel} from '../models/employee.model';
import {ProjectModel} from '../models/project.model';
import {TicketModel} from '../models/ticket.model';
import {TimeSheetModel} from '../models/timeSheet.model';

@Injectable()
export class BackendService {

  constructor(private httpClientModule: HttpClientModule,
              private httpClient: HttpClient) {}

  public login(login: string, password: string): Observable<any> {
    const body = {
      'Login': login,
      'Password': password
    };

    return this.httpClient
      .post(`${UrlParams.login}`, body,
    {
              headers: new HttpHeaders().set(
                'API_KEY', `${API_KEY}`
              )
            })
      .pipe(
        catchError(this._handleError)
      );
  }


  getAllEmployees(): Observable<any[]> {
    return this.httpClient
      .get(`${UrlParams.employees}`, {
            headers: new HttpHeaders().set(
              'API_KEY', `${API_KEY}`
            )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  getEmployee(id: number): Observable<any> {
    return this.httpClient
      .get(`${UrlParams.employees}` + '/' + id, {
            headers: new HttpHeaders().set(
              'API_KEY', `${API_KEY}`
            )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  getProjectsByEmployee(id: number): Observable<any> {
    return this.httpClient
      .get(`${UrlParams.employees}` + '/' + id + '/projects', {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  deleteEmployee(id: number): Observable<any[]> {
    return this.httpClient
      .delete(`${UrlParams.employees}` + '/' + id, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  editEmployee(data: EmployeeModel): Observable<any> {
    return this.httpClient
      .put(`${UrlParams.employees}`, data, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  addEmployee(data: EmployeeModel): Observable<any[]> {
    return this.httpClient
      .post(`${UrlParams.employees}`, data, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  getProjects(): Observable<any[]> {
    return this.httpClient
      .get(`${UrlParams.projects}`, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  deleteProject(id: number): Observable<any[]> {
    return this.httpClient
      .delete(`${UrlParams.projects}` + '/' + id, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  addProject(data: ProjectModel): Observable<any[]> {
    return this.httpClient
      .post(`${UrlParams.projects}`, data, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  addTicket(data: TicketModel): Observable<any[]> {
    return this.httpClient
      .post(`${UrlParams.tasks}`, data, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  getTicket(ticketId: number): Observable<any[]> {
    return this.httpClient
      .get(`${UrlParams.tasks}` + '/' + ticketId + '/timesheets', {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  editTicket(data: TicketModel): Observable<any[]> {
    return this.httpClient
      .put(`${UrlParams.tasks}`, data, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  deleteTicket(id: number): Observable<any[]> {
    return this.httpClient
      .delete(`${UrlParams.tasks}` + '/' + id, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }


  getTimesheetsByProjId(id: number): Observable<any[]> {
    return this.httpClient
      .get(`${UrlParams.timesheets}` + '/search?query.projId=' + id, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  addTimesheet(data: TimeSheetModel): Observable<any[]> {
    return this.httpClient
      .post(`${UrlParams.timesheets}`, data, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  deleteTimesheet(id: number): Observable<any[]> {
    return this.httpClient
      .delete(`${UrlParams.timesheets}` + '/' + id, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  editTimesheet(data: TicketModel): Observable<any[]> {
    return this.httpClient
      .put(`${UrlParams.timesheets}`, data, {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  getProjectTickets(id: number): Observable<any[]> {
    return this.httpClient
      .get(`${UrlParams.projects}` + '/' + id + '/tickets', {
        headers: new HttpHeaders().set(
          'API_KEY', `${API_KEY}`
        )
      })
      .pipe(
        catchError(this._handleError)
      );
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return Observable.throw(errorMsg);
  }


}
