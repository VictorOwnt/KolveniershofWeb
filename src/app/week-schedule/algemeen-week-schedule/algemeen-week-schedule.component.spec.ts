import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AlgemeenWeekScheduleComponent } from "./algemeen-week-schedule.component";

describe("AlgemeenWeekScheduleComponent", () => {
  let component: AlgemeenWeekScheduleComponent;
  let fixture: ComponentFixture<AlgemeenWeekScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlgemeenWeekScheduleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgemeenWeekScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
