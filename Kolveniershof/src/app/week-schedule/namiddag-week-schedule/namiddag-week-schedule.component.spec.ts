import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NamiddagWeekScheduleComponent } from "./namiddag-week-schedule.component";

describe("NamiddagWeekScheduleComponent", () => {
  let component: NamiddagWeekScheduleComponent;
  let fixture: ComponentFixture<NamiddagWeekScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NamiddagWeekScheduleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamiddagWeekScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
