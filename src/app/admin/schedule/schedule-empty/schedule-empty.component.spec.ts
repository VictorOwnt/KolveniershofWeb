import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEmptyComponent } from './schedule-empty.component';

describe('ScheduleEmptyComponent', () => {
  let component: ScheduleEmptyComponent;
  let fixture: ComponentFixture<ScheduleEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
