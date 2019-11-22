import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleUnitComponent } from './schedule-unit.component';

describe('ScheduleItemComponent', () => {
  let component: ScheduleUnitComponent;
  let fixture: ComponentFixture<ScheduleUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
