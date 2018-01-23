import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ResultModel } from '../../models/result.model';
import { ResultsService } from '../../services/results.service';
import { ResultsStateService } from '../../services/results-state.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit, AfterViewChecked {

  results: Array<ResultModel> = [];

  constructor(private resultsService: ResultsService,
    private resultsStateService: ResultsStateService) {

  }

  ngOnInit() {
    feather.replace();
    this.getAllTestResults();
    this.resultsStateService.newTestResult$
      .subscribe(
        () => {
          this.getAllTestResults();
        }
      )
  }

  ngAfterViewChecked(){
    feather.replace();
  }

  getAllTestResults(){
    this.resultsService.getAllResults()
      .subscribe(
        (results) => {
          this.results = results;
        }
      );
  }

  deleteTestResult(resultId: string) {
    this.resultsService.deleteResult(resultId)
      .subscribe(
        (result) => {
          let index = this.results.map(
            (x) => {
              return x._id;
            }
          ).indexOf(result._id);
          this.results.splice(index, 1);
        }
      );
  }

}
