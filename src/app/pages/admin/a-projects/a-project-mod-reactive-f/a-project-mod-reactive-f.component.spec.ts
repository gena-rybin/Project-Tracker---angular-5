import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AProjectModReactiveFComponent } from './a-project-mod-reactive-f.component';

describe('AProjectModReactiveFComponent', () => {
  let component: AProjectModReactiveFComponent;
  let fixture: ComponentFixture<AProjectModReactiveFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AProjectModReactiveFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AProjectModReactiveFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
