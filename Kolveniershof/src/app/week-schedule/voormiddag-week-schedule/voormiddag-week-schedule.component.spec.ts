import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VoormiddagWeekScheduleComponent } from "./voormiddag-week-schedule.component";

describe("VoormiddagWeekScheduleComponent", () => {
  let component: VoormiddagWeekScheduleComponent;
  let fixture: ComponentFixture<VoormiddagWeekScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoormiddagWeekScheduleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoormiddagWeekScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
