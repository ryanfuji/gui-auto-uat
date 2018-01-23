import { TestBed, inject } from '@angular/core/testing';

import { ResultsStateService } from './results-state.service';

describe('ResultsStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultsStateService]
    });
  });

  it('should be created', inject([ResultsStateService], (service: ResultsStateService) => {
    expect(service).toBeTruthy();
  }));
});
