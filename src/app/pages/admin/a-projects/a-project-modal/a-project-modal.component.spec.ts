import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AProjectModalComponent} from './a-project-modal.component';

describe('AProjectModalComponent', () => {
  let component: AProjectModalComponent;
  let fixture: ComponentFixture<AProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AProjectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
