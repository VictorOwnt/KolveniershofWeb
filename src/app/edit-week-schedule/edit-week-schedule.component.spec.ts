import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeekScheduleComponent } from './edit-week-schedule.component';

describe('EditWeekScheduleComponent', () => {
  let component: EditWeekScheduleComponent;
  let fixture: ComponentFixture<EditWeekScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWeekScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeekScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
