import { TestBed, inject } from '@angular/core/testing';

import { ScenarioStateService } from './scenario-state.service';

describe('ScenarioStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScenarioStateService]
    });
  });

  it('should be created', inject([ScenarioStateService], (service: ScenarioStateService) => {
    expect(service).toBeTruthy();
  }));
});
