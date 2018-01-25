import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { appRoutes } from './app.routes';
import { NavigationStateService } from './services/navigation-state.service';
import { FeaturesComponent } from './components/features/features.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SuitesComponent } from './components/suites/suites.component';
import { ProjectsService } from './services/projects.service';
import { SuitesGuardService } from './services/suites-guard.service';
import { FeaturesGuardService } from './services/features-guard.service';
import { SuitesService } from './services/suites.service';
import { FeaturesService } from './services/features.service';
import { ScenariosComponent } from './components/scenarios/scenarios.component';
import { ScenariosGuardService } from './services/scenarios-guard.service';
import { ScenariosService } from './services/scenarios.service';
import { StepsService } from './services/steps.service';
import { CreateScenarioComponent } from './components/scenarios/create-scenario/create-scenario.component';
import { ScenarioStateService } from './services/scenario-state.service';
import { StepComponent } from './components/scenarios/create-scenario/step/step.component';
import { FeatureRunnerService } from './services/feature-runner.service';
import { ResultsService } from './services/results.service';
import { ResultsStateService } from './services/results-state.service';
import { TestResultsComponent } from './components/test-results/test-results.component';
import { TestResultDetailComponent } from './components/test-result-detail/test-result-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    BreadcrumbComponent,
    FeaturesComponent,
    ProjectsComponent,
    SuitesComponent,
    ScenariosComponent,
    CreateScenarioComponent,
    StepComponent,
    TestResultsComponent,
    TestResultDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MomentModule
  ],
  providers: [
    NavigationStateService,
    ProjectsService,
    SuitesGuardService,
    FeaturesGuardService,
    SuitesService,
    FeaturesService,
    ScenariosGuardService,
    ScenariosService,
    StepsService,
    ScenarioStateService,
    FeatureRunnerService,
    ResultsService,
    ResultsStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
