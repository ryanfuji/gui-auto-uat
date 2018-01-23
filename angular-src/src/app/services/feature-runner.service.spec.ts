import { TestBed, inject } from '@angular/core/testing';

import { FeatureRunnerService } from './feature-runner.service';

describe('FeatureRunnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureRunnerService]
    });
  });

  it('should be created', inject([FeatureRunnerService], (service: FeatureRunnerService) => {
    expect(service).toBeTruthy();
  }));
});
