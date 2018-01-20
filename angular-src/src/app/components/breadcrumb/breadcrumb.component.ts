import { Component, OnInit } from '@angular/core';
import { NavigationStateService } from '../../services/navigation-state.service';
import { ProjectModel } from '../../models/project.model';
import { SuiteModel } from '../../models/suite.model';
import { FeatureModel } from '../../models/feature.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  project: ProjectModel;
  suite: SuiteModel;
  feature: FeatureModel;

  constructor(private navigationStateService: NavigationStateService) {

  }

  ngOnInit() {
    this.navigationStateService.selectedProject$
      .subscribe(
        (project) => {
          this.project = project;
        }
      );
    this.navigationStateService.selectedSuite$
      .subscribe(
        (suite) => {
          this.suite = suite;
        }
      );
    this.navigationStateService.selectedFeature$
      .subscribe(
        (feature) => {
          this.feature = feature;
        }
      );
  }

}
