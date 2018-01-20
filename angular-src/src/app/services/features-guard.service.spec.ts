import { TestBed, inject } from '@angular/core/testing';

import { FeaturesGuardService } from './features-guard.service';

describe('FeaturesGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturesGuardService]
    });
  });

  it('should be created', inject([FeaturesGuardService], (service: FeaturesGuardService) => {
    expect(service).toBeTruthy();
  }));
});
