import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AEmployeesComponent} from './a-employees.component';

describe('AEmployeesComponent', () => {
  let component: AEmployeesComponent;
  let fixture: ComponentFixture<AEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
