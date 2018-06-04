/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {TimesheetsComponent} from './timesheets.component';

describe('TimesheetsComponent', () => {
  let component: TimesheetsComponent;
  let fixture: ComponentFixture<TimesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
