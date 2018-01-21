import { Injectable } from '@angular/core';
import { ScenarioModel } from '../models/scenario.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ScenariosService {

  baseUrl: string = environment.baseApiUrl+'/scenarios';

  constructor(private http: Http) {

  }

  getAllByFeatureId(featureId: string): Observable<Array<ScenarioModel>> {
    return this.http.get(this.baseUrl+'/getAllByFeatureId/'+featureId)
      .pipe(
        map(
          (scenarios) => {
            return scenarios.json() as Array<ScenarioModel>;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  createScenario(scenario: ScenarioModel): Observable<ScenarioModel> {
    return this.http.post(this.baseUrl+'/add', scenario)
      .pipe(
        map(
          (scenario) => {
            return scenario.json() as ScenarioModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  updateScenario(scenario: ScenarioModel): Observable<ScenarioModel> {
    return this.http.put(this.baseUrl+'/update', scenario)
      .pipe(
        map(
          (scenario) => {
            return scenario.json() as ScenarioModel;
          },
          (error) => {
            return error;
          }
        )
      )
  }

  deleteScenario(scenarioId: string): Observable<ScenarioModel> {
    return this.http.delete(this.baseUrl+'/delete/'+scenarioId)
      .pipe(
        map(
          (scenario) => {
            return scenario.json() as ScenarioModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }
}
