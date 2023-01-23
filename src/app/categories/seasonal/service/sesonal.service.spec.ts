import { TestBed } from '@angular/core/testing';

import { SesonalService } from './sesonal.service';

describe('SesonalService', () => {
  let service: SesonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
