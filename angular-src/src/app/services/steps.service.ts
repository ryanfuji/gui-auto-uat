import { Injectable } from '@angular/core';
import { StepModel } from '../models/step.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class StepsService {

  baseUrl: string = environment.baseApiUrl+'/steps';

  constructor(private http: Http) {

  }

  getAll(): Observable<Array<StepModel>> {
    return this.http.get(this.baseUrl)
      .pipe(
        map(
          (steps) => {
            return steps.json() as Array<StepModel>;
          },
          (error) => {
            return error;
          }
        )
      );
  }

}
