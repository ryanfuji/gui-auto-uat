import { TestBed, inject } from '@angular/core/testing';

import { SuitesGuardService } from './suites-guard.service';

describe('SuitesGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuitesGuardService]
    });
  });

  it('should be created', inject([SuitesGuardService], (service: SuitesGuardService) => {
    expect(service).toBeTruthy();
  }));
});
