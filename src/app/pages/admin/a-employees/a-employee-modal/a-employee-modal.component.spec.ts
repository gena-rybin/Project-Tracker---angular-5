import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AEmployeeModalComponent} from './a-employee-modal.component';

describe('AEmployeeModalComponent', () => {
  let component: AEmployeeModalComponent;
  let fixture: ComponentFixture<AEmployeeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AEmployeeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AEmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
