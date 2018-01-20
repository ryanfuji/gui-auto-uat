import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SuitesService } from '../../services/suites.service';
import { SuiteModel } from '../../models/suite.model';
import { NavigationStateService } from '../../services/navigation-state.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-suites',
  templateUrl: './suites.component.html',
  styleUrls: ['./suites.component.css']
})
export class SuitesComponent implements OnInit, AfterViewChecked {

  showLoadingImage: boolean = true;
  suites: Array<SuiteModel> = [];
  showLoadingSuitesError: boolean = false;
  suiteForm: FormGroup;
  createButtonClicked: boolean = false;
  showSuiteCreatedFailure: boolean = false;

  constructor(private navigationStateService: NavigationStateService,
    private suitesService: SuitesService,
    private formBuilder: FormBuilder) {
    this.createSuiteForm();
  }

  ngOnInit() {
    feather.replace();
    this.suitesService.getAllByProjectId(this.navigationStateService.projectIdSelected)
      .subscribe(
        (suites) => {
          this.suites = suites;
          this.showLoadingImage = false;
        },
        (error) => {
          this.showLoadingSuitesError = true;
          this.showLoadingImage = false;
        }
      )
  }

  ngAfterViewChecked(){
    feather.replace();
  }

  openModal(suite: SuiteModel){

  }

  deleteSuite(suiteId: string){

  }

  createSuiteForm(){
    this.suiteForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  createNewSuite(){
    if(this.suiteForm.invalid){
      return;
    }
    let suiteModel = new SuiteModel();
    suiteModel.title = this.suiteForm.get('title').value;
    suiteModel.projectId = this.navigationStateService.projectIdSelected;
    this.showLoadingImage = true;
    this.suitesService.createSuite(suiteModel)
      .subscribe(
        (suite) => {
          this.suites.unshift(suite);
          this.showLoadingImage = false;
        },
        (error) => {
          this.showSuiteCreatedFailure = true;
          this.showLoadingImage = false;
        }
      );
  }

}
