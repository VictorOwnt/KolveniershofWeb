import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusschemaComponent } from './busschema.component';

describe('BusschemaComponent', () => {
  let component: BusschemaComponent;
  let fixture: ComponentFixture<BusschemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusschemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusschemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
