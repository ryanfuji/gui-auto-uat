import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultModel } from '../../models/result.model';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-test-result-detail',
  templateUrl: './test-result-detail.component.html',
  styleUrls: ['./test-result-detail.component.css']
})
export class TestResultDetailComponent implements OnInit {

  showLoadingImage: boolean = true;
  showErrorRetrievingResult: boolean = false;
  result: ResultModel;
  resultId: string;

  constructor(private activatedRoute: ActivatedRoute,
    private resultsService: ResultsService) {
    activatedRoute.params.subscribe(
      (params) => {
        this.resultId = params['resultId'];
      }
    );
  }

  ngOnInit() {
    this.resultsService.getResultById(this.resultId)
      .subscribe(
        (result) => {
          this.result = result;
          this.showLoadingImage = false;
        },
        (error) => {
          this.showErrorRetrievingResult = true;
          this.showLoadingImage = false;
        }
      );
  }

}
