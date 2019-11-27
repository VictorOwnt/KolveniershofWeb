import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBussesComponent } from './admin-busses.component';

describe('AdminBussesComponent', () => {
  let component: AdminBussesComponent;
  let fixture: ComponentFixture<AdminBussesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBussesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBussesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
