import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScenarioStateService {

  private componentToOpen = new Subject<string>();
  componentToOpen$: Observable<string> = this.componentToOpen.asObservable();

  constructor() {

  }

  announceComponentToOpen(componentName: string){
    this.componentToOpen.next(componentName);
  }

}
