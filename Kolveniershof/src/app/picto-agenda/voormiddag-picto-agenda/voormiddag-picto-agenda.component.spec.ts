import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoormiddagPictoAgendaComponent } from './voormiddag-picto-agenda.component';

describe('VoormiddagPictoAgendaComponent', () => {
  let component: VoormiddagPictoAgendaComponent;
  let fixture: ComponentFixture<VoormiddagPictoAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoormiddagPictoAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoormiddagPictoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
