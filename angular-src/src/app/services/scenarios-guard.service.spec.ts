import { TestBed, inject } from '@angular/core/testing';

import { ScenariosGuardService } from './scenarios-guard.service';

describe('ScenariosGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScenariosGuardService]
    });
  });

  it('should be created', inject([ScenariosGuardService], (service: ScenariosGuardService) => {
    expect(service).toBeTruthy();
  }));
});
