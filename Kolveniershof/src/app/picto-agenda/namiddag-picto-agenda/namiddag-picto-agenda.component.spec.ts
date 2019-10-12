import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamiddagPictoAgendaComponent } from './namiddag-picto-agenda.component';

describe('NamiddagPictoAgendaComponent', () => {
  let component: NamiddagPictoAgendaComponent;
  let fixture: ComponentFixture<NamiddagPictoAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamiddagPictoAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamiddagPictoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
