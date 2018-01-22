import { Injectable } from '@angular/core';
import { FeatureModel } from '../models/feature.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class FeaturesService {

  baseUrl: string = environment.baseApiUrl + '/features';

  constructor(private http: Http) {

  }

  getAllBySuiteId(suiteId: string): Observable<Array<FeatureModel>> {
    return this.http.get(this.baseUrl+'/getAllBySuiteId/'+suiteId)
      .pipe(
        map(
          (features) => {
            return features.json() as Array<FeatureModel>;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  createFeature(feature: FeatureModel): Observable<FeatureModel> {
    return this.http.post(this.baseUrl+'/add', feature)
      .pipe(
        map(
          (feature) => {
            return feature.json() as FeatureModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  updateFeature(feature: FeatureModel): Observable<FeatureModel> {
    return this.http.put(this.baseUrl+'/update', feature)
      .pipe(
        map(
          (feature) => {
            return feature.json() as FeatureModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  deleteFeature(featureId: string): Observable<FeatureModel> {
    return this.http.delete(this.baseUrl+'/delete/'+featureId)
      .pipe(
        map(
          (feature) => {
            return feature.json() as FeatureModel;
          },
          (error) => {
            return error;
          }
        )
      );
  }

  checkIfFilenameExists(projectId: string, filename: string): Observable<boolean> {
    return this.http.get(this.baseUrl+'/fienameExists/'+projectId+'/'+filename)
      .pipe(
        map(
          (result) => {
            return result.json().fienameExists as boolean;
          },
          (error) => {
            return error;
          }
        )
      );
  }

}
