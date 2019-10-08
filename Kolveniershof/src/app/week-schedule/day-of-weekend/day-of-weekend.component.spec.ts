import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOfWeekendComponent } from './day-of-weekend.component';

describe('DayOfWeekendComponent', () => {
  let component: DayOfWeekendComponent;
  let fixture: ComponentFixture<DayOfWeekendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOfWeekendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOfWeekendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
