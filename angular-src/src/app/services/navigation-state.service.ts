import { Injectable } from '@angular/core';
import { ProjectModel } from '../models/project.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavigationStateService {

  projectIdSelected: string;
  private selectedProject = new Subject<ProjectModel>();
  selectedProject$: Observable<ProjectModel> = this.selectedProject.asObservable();

  constructor() {

  }

  announceProjectSelected(project: ProjectModel){
    if(project){
      this.projectIdSelected = project._id;
    } else {
      this.projectIdSelected = null;
    }
    this.selectedProject.next(project);
  }

}
