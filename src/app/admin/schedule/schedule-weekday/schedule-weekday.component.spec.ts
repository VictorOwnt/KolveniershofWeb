import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleWeekdayComponent } from './schedule-weekday.component';

describe('ScheduleDayComponent', () => {
  let component: ScheduleWeekdayComponent;
  let fixture: ComponentFixture<ScheduleWeekdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleWeekdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleWeekdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
