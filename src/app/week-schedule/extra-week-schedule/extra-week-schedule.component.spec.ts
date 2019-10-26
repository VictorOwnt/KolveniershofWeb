import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExtraWeekScheduleComponent } from "./extra-week-schedule.component";

describe("ExtraWeekScheduleComponent", () => {
  let component: ExtraWeekScheduleComponent;
  let fixture: ComponentFixture<ExtraWeekScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraWeekScheduleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraWeekScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
