import {Component, OnDestroy} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {EmployeeModel} from '../../models/employee.model';
import {CommonDataService} from '../../services/common-data.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'pt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  public login: string;
  public password: string;
  // public login = 'maxim.basisty@gmail.com';
  // public password = '111111';
  user: EmployeeModel;
  alive = true;

  constructor(private backendService: BackendService,
              public commonDataService: CommonDataService,
              public router: Router) {}

  ngOnDestroy() {
    this.alive = false;
  }

  private loginClick(): void {
    this.backendService.login(this.login, this.password)
      .takeWhile(() => this.alive)
      .subscribe((res) => {
        this.user = res;
        this.commonDataService.setCurrentUser(res);
        sessionStorage.setItem('_user', JSON.stringify(this.user));
        this.router.navigate(['']);

      }, (err) => {
        console.log(err);
      } );
  }

}
