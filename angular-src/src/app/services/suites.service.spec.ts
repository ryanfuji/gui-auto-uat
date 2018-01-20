import { TestBed, inject } from '@angular/core/testing';

import { SuitesService } from './suites.service';

describe('SuitesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuitesService]
    });
  });

  it('should be created', inject([SuitesService], (service: SuitesService) => {
    expect(service).toBeTruthy();
  }));
});
