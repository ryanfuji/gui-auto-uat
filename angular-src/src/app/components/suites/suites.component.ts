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
  editSuiteForm: FormGroup;
  createButtonClicked: boolean = false;
  showSuiteCreatedFailure: boolean = false;
  showSuiteEditFailure: boolean = false;
  editSuiteButtonClicked: boolean = false;
  suiteToEdit: SuiteModel;
  addModalToDom: boolean = false;
  display: string = 'none';
  showSuiteDeleteFailure: boolean = false;

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
    this.suiteToEdit = suite;
    this.createEditSuiteForm();
    this.addModalToDom = true;
    this.display='block';
  }

  closeModal(){
    this.suiteToEdit = null;
    this.display='none';
  }

  deleteSuite(suiteId: string){
    if(confirm('Are you sure you want to delete this test suite?')){
      this.showLoadingImage = true;
      this.suitesService.deleteSuite(suiteId)
        .subscribe(
          (suite) => {
            let index = this.suites.map(
              (x) => {
                return x._id;
              }
            ).indexOf(suite._id);
            this.suites.splice(index, 1);
            this.showLoadingImage = false;
          },
          (error) => {
            this.showSuiteDeleteFailure = true;
            this.showLoadingImage = false;
          }
        );
    }
  }

  createSuiteForm(){
    this.suiteForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  createEditSuiteForm(){
    this.editSuiteForm = this.formBuilder.group({
      title: [this.suiteToEdit.title, Validators.required]
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
          this.suiteForm.reset();
          this.showLoadingImage = false;
        },
        (error) => {
          this.showSuiteCreatedFailure = true;
          this.showLoadingImage = false;
        }
      );
  }

  editSuite(){
    this.editSuiteButtonClicked = true;
    if(this.editSuiteForm.invalid){
      return;
    }
    this.suiteToEdit.title = this.editSuiteForm.get('title').value;
    this.showLoadingImage = true;
    this.suitesService.updateSuite(this.suiteToEdit)
      .subscribe(
        (suite) => {
          let index = this.suites.map(
            (x) => {
              return x._id;
            }
          ).indexOf(suite._id);
          this.suites.splice(index, 1, suite);
          this.editSuiteForm.reset();
          this.editSuiteButtonClicked = false;
          this.display = 'none';
          this.showLoadingImage = false;
        },
        (error) => {
          this.showSuiteEditFailure = true;
          this.editSuiteButtonClicked = false;
          this.display = 'none';
          this.showLoadingImage = false;
        }
      );
  }

  selectSuite(suite: SuiteModel){
    this.navigationStateService.announceSuiteSelected(suite);
  }

}
