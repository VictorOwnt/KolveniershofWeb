import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBusComponent } from './admin-bus.component';

describe('AdminBusComponent', () => {
  let component: AdminBusComponent;
  let fixture: ComponentFixture<AdminBusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
