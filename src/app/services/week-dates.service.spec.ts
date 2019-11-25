import { TestBed } from '@angular/core/testing';

import { DatesService } from './dates.service';

describe('WeekDatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatesService = TestBed.get(DatesService);
    expect(service).toBeTruthy();
  });
});
