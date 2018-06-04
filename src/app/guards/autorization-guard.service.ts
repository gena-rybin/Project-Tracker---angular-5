import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {EmployeeModel} from '../models/employee.model';
import {CommonDataService} from '../services/common-data.service';

@Injectable()
export class AutorizationGuardService implements CanActivate {

  constructor(public router: Router,
              public commonDataService: CommonDataService) {}

  canActivate() {

    if (sessionStorage.length && sessionStorage.getItem('_user')
        && (<EmployeeModel>this.commonDataService.tryJsonParse(sessionStorage.getItem('_user'))).FullName) {
      return true;
    }

    this.commonDataService.logout();
    return false;
  }
}
