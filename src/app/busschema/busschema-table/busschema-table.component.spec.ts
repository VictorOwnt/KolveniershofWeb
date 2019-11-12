import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BusschemaTableComponent } from "./busschema-table.component";

describe("BusschemaTableComponent", () => {
  let component: BusschemaTableComponent;
  let fixture: ComponentFixture<BusschemaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusschemaTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusschemaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
