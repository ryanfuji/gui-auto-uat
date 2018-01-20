import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavigationStateService } from './navigation-state.service';
import { Router } from '@angular/router';

@Injectable()
export class SuitesGuardService implements CanActivate {

  projectSelected: boolean = false;

  constructor(private navigationStateService: NavigationStateService,
    private router: Router) {

  }

  canActivate(): boolean {
    if(this.navigationStateService.projectIdSelected){
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
