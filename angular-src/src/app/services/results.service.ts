import { Injectable } from '@angular/core';
import { ResultModel } from '../models/result.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ResultsService {

  baseUrl: string = environment.baseApiUrl + '/results';

  constructor(private http: Http) {

  }

  getAllResults(): Observable<Array<ResultModel>> {
    return this.http.get(this.baseUrl + '/getAll')
      .pipe(
        map(
          (results) => {
            return results.json() as Array<ResultModel>;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  deleteResult(resultId: string): Observable<ResultModel> {
    return this.http.delete(this.baseUrl + '/delete/' + resultId)
      .pipe(
        map(
          (result) => {
            return result.json() as ResultModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  createResult(projectId: string, projectTitle: string): Observable<ResultModel> {
    let body = {
      projectId: projectId,
      projectTitle: projectTitle
    };
    return this.http.post(this.baseUrl + '/create', body)
      .pipe(
        map(
          (result) => {
            return result.json() as ResultModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  getResultById(resultId: string): Observable<ResultModel> {
    return this.http.get(this.baseUrl+'/getById/'+resultId)
      .pipe(
        map(
          (result) => {
            return result.json() as ResultModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

}
