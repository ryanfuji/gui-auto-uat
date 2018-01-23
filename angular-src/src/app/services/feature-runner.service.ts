import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class FeatureRunnerService {

  baseUrl: string = environment.baseApiUrl + '/feature-runner';

  constructor(private http: Http) {

  }

  runFeatures(): Observable<boolean> {
    return this.http.get(this.baseUrl + '/run')
      .pipe(
        map(
          (result) => {
            return true;
          },
          (error) => {
            return true;
          }
        )
      );
  }

}
