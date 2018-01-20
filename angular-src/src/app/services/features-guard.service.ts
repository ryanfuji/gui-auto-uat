import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavigationStateService } from './navigation-state.service';
import { Router } from '@angular/router';

@Injectable()
export class FeaturesGuardService implements CanActivate {

  constructor(private navigationStateService: NavigationStateService,
    private router: Router) {

  }

  canActivate(): boolean {
    if(this.navigationStateService.suiteIdSelected){
      return true;
    }
    this.router.navigate(['/suites']);
    return false;
  }

}
