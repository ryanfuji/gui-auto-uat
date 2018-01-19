import { Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { FeaturesComponent } from './components/features/features.component';
import { SuitesComponent } from './components/suites/suites.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent
  },
  {
    path: 'suites',
    component: SuitesComponent
  },
  {
    path: 'features',
    component: FeaturesComponent
  }
];
