import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AEmployeesModReactiveFComponent } from './a-employees-mod-reactive-f.component';

describe('AEmployeesModReactiveFComponent', () => {
  let component: AEmployeesModReactiveFComponent;
  let fixture: ComponentFixture<AEmployeesModReactiveFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AEmployeesModReactiveFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AEmployeesModReactiveFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
