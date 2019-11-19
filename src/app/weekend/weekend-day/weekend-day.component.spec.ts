import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekendDayComponent } from './weekend-day.component';

describe('WeekendDayComponent', () => {
  let component: WeekendDayComponent;
  let fixture: ComponentFixture<WeekendDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekendDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekendDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
