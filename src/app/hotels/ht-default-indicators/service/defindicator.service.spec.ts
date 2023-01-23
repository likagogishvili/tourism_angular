import { TestBed } from '@angular/core/testing';

import { DefindicatorService } from './defindicator.service';

describe('DefindicatorService', () => {
  let service: DefindicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefindicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
