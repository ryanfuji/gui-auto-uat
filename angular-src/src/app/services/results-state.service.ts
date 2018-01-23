import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ResultsStateService {

  private newTestResult = new Subject();
  newTestResult$ = this.newTestResult.asObservable();

  constructor() {

  }

  announceNewTestResult(){
    this.newTestResult.next();
  }

}
