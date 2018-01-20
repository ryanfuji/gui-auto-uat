import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavigationStateService } from './navigation-state.service';
import { Router } from '@angular/router';

@Injectable()
export class ScenariosGuardService implements CanActivate {

  featureSelected: boolean = false;

  constructor(private navigationStateService: NavigationStateService,
    private router: Router) {

  }

  canActivate(): boolean {
    if(this.navigationStateService.featureIdSelected){
      return true;
    }
    this.router.navigate(['/features']);
    return false;
  }

}
