import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { SuiteModel } from '../models/suite.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class SuitesService {

  baseUrl: string = environment.baseApiUrl + '/suites';

  constructor(private http: Http) {

  }

  getAllByProjectId(projectId: string): Observable<Array<SuiteModel>> {
    return this.http.get(this.baseUrl+'/getAllByProjectId/'+projectId)
      .pipe(
        map(
          (suites) => {
            return suites.json() as Array<SuiteModel>;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  createSuite(suite: SuiteModel): Observable<SuiteModel> {
    return this.http.post(this.baseUrl+'/add', suite)
      .pipe(
        map(
          (suite) => {
            return suite.json() as SuiteModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  updateSuite(suite: SuiteModel): Observable<SuiteModel> {
    return this.http.put(this.baseUrl+'/update', suite)
      .pipe(
        map(
          (suite) => {
            return suite.json() as SuiteModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  deleteSuite(suiteId: string): Observable<SuiteModel> {
    return this.http.delete(this.baseUrl+'/delete/'+suiteId)
      .pipe(
        map(
          (suite) => {
            return suite.json() as SuiteModel;
          },
          (error) => {
            return error;
          }
        )
      )
  }

}
