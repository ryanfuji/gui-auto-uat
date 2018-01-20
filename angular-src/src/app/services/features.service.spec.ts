import { TestBed, inject } from '@angular/core/testing';

import { FeaturesService } from './features.service';

describe('FeaturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturesService]
    });
  });

  it('should be created', inject([FeaturesService], (service: FeaturesService) => {
    expect(service).toBeTruthy();
  }));
});
