import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusNewComponent } from './bus-new.component';

describe('BusNewComponent', () => {
  let component: BusNewComponent;
  let fixture: ComponentFixture<BusNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
