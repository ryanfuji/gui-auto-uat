import { Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { FeaturesComponent } from './components/features/features.component';
import { SuitesComponent } from './components/suites/suites.component';
import { SuitesGuardService } from './services/suites-guard.service';
import { FeaturesGuardService } from './services/features-guard.service';
import { ScenariosComponent } from './components/scenarios/scenarios.component';
import { ScenariosGuardService } from './services/scenarios-guard.service';
import { TestResultDetailComponent } from './components/test-result-detail/test-result-detail.component';

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
  },
  {
    path: 'scenarios',
    component: ScenariosComponent,
    canActivate: [ScenariosGuardService]
  },
  {
    path: 'test-result/:resultId',
    component: TestResultDetailComponent
  }
];
