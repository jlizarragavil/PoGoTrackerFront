import { TestBed } from '@angular/core/testing';

import { XpServiceService } from './xp-service.service';

describe('XpServiceService', () => {
  let service: XpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
