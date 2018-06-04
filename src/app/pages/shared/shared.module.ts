import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {TabViewModule} from 'primeng/tabview';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TooltipModule} from 'primeng/tooltip';

import {LoggedInPageComponent} from '../index-page/logged-in-page/logged-in-page.component';
import {NavbarTopComponent} from '../index-page/navbar-top/navbar-top.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InputTextModule, ButtonModule, TableModule, DialogModule, TabViewModule, CalendarModule, InputTextareaModule,
    OverlayPanelModule, TooltipModule,

  ],
  declarations: [
    LoggedInPageComponent,
    NavbarTopComponent
  ],
  exports: [
    LoggedInPageComponent,
    NavbarTopComponent,
  ]
})
export class SharedModule { }
