import { Injectable } from '@angular/core';
import { ProjectModel } from '../models/project.model';
import { SuiteModel } from '../models/suite.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavigationStateService {

  projectIdSelected: string;
  suiteIdSelected: string;
  private selectedProject = new Subject<ProjectModel>();
  selectedProject$: Observable<ProjectModel> = this.selectedProject.asObservable();
  private selectedSuite = new Subject<SuiteModel>();
  selectedSuite$: Observable<SuiteModel> = this.selectedSuite.asObservable();

  constructor() {

  }

  announceProjectSelected(project: ProjectModel){
    if(project){
      this.projectIdSelected = project._id;
    } else {
      this.projectIdSelected = null;
    }
    this.announceSuiteSelected(null);
    this.selectedProject.next(project);

  }

  announceSuiteSelected(suite: SuiteModel){
    if(suite){
      this.suiteIdSelected = suite._id;
    } else {
      this.suiteIdSelected = null;
    }
    this.selectedSuite.next(suite);
  }

}
