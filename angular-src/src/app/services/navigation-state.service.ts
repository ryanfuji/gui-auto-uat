import { Injectable } from '@angular/core';
import { ProjectModel } from '../models/project.model';

@Injectable()
export class NavigationStateService {

  currentProject: ProjectModel;

  constructor() {

  }

}
