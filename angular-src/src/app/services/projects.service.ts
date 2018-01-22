import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ProjectModel } from '../models/project.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectsService {

  private baseUrl: string = environment.baseApiUrl + '/projects';

  constructor(private http: Http) {

  }

  getAllProjects(): Observable<Array<ProjectModel>> {
    return this.http.get(this.baseUrl)
      .pipe(
        map(
          (projects) => {
            return projects.json() as Array<ProjectModel>;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  createProject(project: ProjectModel): Observable<ProjectModel> {
    return this.http.post(this.baseUrl+'/add', project)
      .pipe(
        map(
          (project) => {
            return project.json() as ProjectModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  editProject(project: ProjectModel): Observable<ProjectModel> {
    return this.http.put(this.baseUrl+'/update', project)
      .pipe(
        map(
          (project) => {
            return project.json() as ProjectModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  deleteProject(projectId: string): Observable<ProjectModel> {
    return this.http.delete(this.baseUrl+'/delete/'+projectId)
      .pipe(
        map(
          (project) => {
            return project.json() as ProjectModel;
          },
          (error) => {
            return error;
          }
        )
      )
  }

  generateFeatures(projectId: string): Observable<boolean> {
    return this.http.get(this.baseUrl+'/generateAllFeatureFilesForProject/'+projectId)
      .pipe(
        map(
          (result) => {
            return result.json().featuresGenerated as boolean;
          },
          (error) => {
            return error;
          }
        )
      );
  }

}
