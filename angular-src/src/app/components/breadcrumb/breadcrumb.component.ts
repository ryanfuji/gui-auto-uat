import { Component, OnInit } from '@angular/core';
import { NavigationStateService } from '../../services/navigation-state.service';
import { ProjectModel } from '../../models/project.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  project: ProjectModel;

  constructor(private navigationStateService: NavigationStateService) {

  }

  ngOnInit() {
    this.navigationStateService.selectedProject$
      .subscribe(
        (project) => {
          this.project = project;
        }
      );
  }

}
