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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    BreadcrumbComponent,
    FeaturesComponent,
    ProjectsComponent,
    SuitesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MomentModule
  ],
  providers: [
    NavigationStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
