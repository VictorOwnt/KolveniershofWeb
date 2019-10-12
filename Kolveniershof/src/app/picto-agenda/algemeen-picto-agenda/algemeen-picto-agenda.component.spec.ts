import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgemeenPictoAgendaComponent } from './algemeen-picto-agenda.component';

describe('AlgemeenPictoAgendaComponent', () => {
  let component: AlgemeenPictoAgendaComponent;
  let fixture: ComponentFixture<AlgemeenPictoAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgemeenPictoAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgemeenPictoAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
