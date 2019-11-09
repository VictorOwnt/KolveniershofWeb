import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BlockOfWeekScheduleComponent } from "./block-of-week-schedule.component";

describe("BlockOfWeekScheduleComponent", () => {
  let component: BlockOfWeekScheduleComponent;
  let fixture: ComponentFixture<BlockOfWeekScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockOfWeekScheduleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockOfWeekScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
