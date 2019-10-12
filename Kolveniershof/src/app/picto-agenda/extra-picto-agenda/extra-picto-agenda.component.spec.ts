import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraPictoAgendaComponent } from './extra-picto-agenda.component';

describe('ExtraPictoAgendaComponent', () => {
  let component: ExtraPictoAgendaComponent;
  let fixture: ComponentFixture<ExtraPictoAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraPictoAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraPictoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
