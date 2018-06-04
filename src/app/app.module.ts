import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PagesModule} from './pages/pages.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './pages/index-page/app.component';
import {CommonDataService} from './services/common-data.service';
import {BackendService} from './services/backend.service';
import {AutorizationGuardService} from './guards/autorization-guard.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    PagesModule,

  ],
  exports: [
    NgbModule
  ],
  providers: [AutorizationGuardService, CommonDataService, BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
