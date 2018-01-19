import { TestBed, inject } from '@angular/core/testing';

import { NavigationStateService } from './navigation-state.service';

describe('NavigationStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationStateService]
    });
  });

  it('should be created', inject([NavigationStateService], (service: NavigationStateService) => {
    expect(service).toBeTruthy();
  }));
});
