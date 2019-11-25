import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleWeekendComponent } from './schedule-weekend.component';

describe('ScheduleWeekendComponent', () => {
  let component: ScheduleWeekendComponent;
  let fixture: ComponentFixture<ScheduleWeekendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleWeekendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleWeekendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
