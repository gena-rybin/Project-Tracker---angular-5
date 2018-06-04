import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewTimeModalComponent} from './new-time-modal.component';

describe('NewTimeModalComponent', () => {
  let component: NewTimeModalComponent;
  let fixture: ComponentFixture<NewTimeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTimeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
