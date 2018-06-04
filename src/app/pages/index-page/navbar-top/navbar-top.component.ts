import {Component, OnInit} from '@angular/core';
import {CommonDataService} from '../../../services/common-data.service';
import {EmployeeModel} from '../../../models/employee.model';

@Component({
  selector: 'pt-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  userName: string;
  user: EmployeeModel;

  constructor(public commonDataService: CommonDataService) {
    commonDataService.user$.subscribe((value: EmployeeModel) => {
      this.user = value;
    });
  }

  ngOnInit() {
    const getUserS = this.commonDataService.getCurrentUser();
    const getUserLS = this.commonDataService.tryJsonParse(localStorage.getItem('_user'));
    this.userName = (getUserS && getUserS.FullName) ? getUserS.FullName :
                        (getUserS && getUserS.First) ? getUserS.First :
                        (getUserS && getUserS.Last) ? getUserS.Last :
                          (getUserLS && getUserLS.FullName) ? getUserLS.FullName : '';
  }

}
