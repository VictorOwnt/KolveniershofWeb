import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PictoAgendaComponent } from "./picto-agenda.component";

describe("PictoAgendaComponent", () => {
  let component: PictoAgendaComponent;
  let fixture: ComponentFixture<PictoAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PictoAgendaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
