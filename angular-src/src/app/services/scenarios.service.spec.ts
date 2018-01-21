import { TestBed, inject } from '@angular/core/testing';

import { ScenariosService } from './scenarios.service';

describe('ScenariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScenariosService]
    });
  });

  it('should be created', inject([ScenariosService], (service: ScenariosService) => {
    expect(service).toBeTruthy();
  }));
});
