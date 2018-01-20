import { Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { FeaturesComponent } from './components/features/features.component';
import { SuitesComponent } from './components/suites/suites.component';
import { SuitesGuardService } from './services/suites-guard.service';
import { FeaturesGuardService } from './services/features-guard.service';

export const appRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'suites',
    component: SuitesComponent,
    canActivate: [SuitesGuardService]
  },
  {
    path: 'features',
    component: FeaturesComponent,
    canActivate: [FeaturesGuardService]
  }
];
