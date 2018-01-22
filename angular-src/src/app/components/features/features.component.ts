import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeatureModel } from '../../models/feature.model';
import { FeaturesService } from '../../services/features.service';
import { NavigationStateService } from '../../services/navigation-state.service';
import * as feather from 'feather-icons';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit, AfterViewChecked {

  showLoadingImage: boolean = true;
  showLoadingFeaturesError: boolean = false;
  features: Array<FeatureModel> = [];
  featureForm: FormGroup;
  editFeatureForm: FormGroup;
  createButtonClicked: boolean = false;
  showFeatureCreatedFailure: boolean = false;
  showFeatureEditFailure: boolean = false;
  editFeatureButtonClicked: boolean = false;
  featureToEdit: FeatureModel;
  addModalToDom: boolean = false;
  display: string = 'none';
  showFeatureDeleteFailure: boolean = false;
  private filenameCheck = new Subject<string>();
  filenameExists: boolean = false;

  constructor(private featuresService: FeaturesService,
    private navigationStateService: NavigationStateService,
    private formBuilder: FormBuilder) {
    this.createFeatureForm();
  }

  ngOnInit() {
    feather.replace();
    this.featuresService.getAllBySuiteId(this.navigationStateService.suiteIdSelected)
      .subscribe(
        (features) => {
          this.features = features;
          this.showLoadingImage = false;
        },
        (error) => {
          this.showLoadingFeaturesError = true;
          this.showLoadingImage = false;
        }
      );
    this.filenameCheck.pipe(debounceTime(500))
      .subscribe(
        (filename) => {
          this.featuresService.checkIfFilenameExists(this.navigationStateService.projectIdSelected, filename)
            .subscribe(
              (exists) => {
                this.filenameExists = true;
                this.featureForm.get('filename').reset();
              }
            );
        }
      );
  }

  ngAfterViewChecked(){
    feather.replace();
  }

  checkFilename(){
    this.filenameCheck.next(this.featureForm.get('filename').value);
  }

  createFeatureForm(){
    this.featureForm = this.formBuilder.group({
      filename: ['', Validators.required],
      title: ['', Validators.required],
      story: ['', Validators.required]
    });
  }

  openModal(feature: FeatureModel){
    this.featureToEdit = feature;
    this.createEditFeatureForm();
    this.addModalToDom = true;
    this.display='block';
  }

  closeModal(){
    this.featureToEdit = null;
    this.display='none';
  }

  createEditFeatureForm(){
    this.editFeatureForm = this.formBuilder.group({
      filename: [this.featureToEdit.filename, Validators.required],
      title: [this.featureToEdit.title, Validators.required],
      story: [this.featureToEdit.story, Validators.required]
    });
  }

  createNewFeature(){
    this.createButtonClicked = true;
    if(this.featureForm.invalid){
      return;
    }
    let featureModel = new FeatureModel();
    featureModel.filename = this.featureForm.get('filename').value;
    featureModel.title = this.featureForm.get('title').value;
    featureModel.story = this.featureForm.get('story').value;
    featureModel.projectId = this.navigationStateService.projectIdSelected;
    featureModel.suiteId = this.navigationStateService.suiteIdSelected;
    this.showLoadingImage = true;
    this.featuresService.createFeature(featureModel)
      .subscribe(
        (feature) => {
          this.features.unshift(feature);
          this.featureForm.reset();
          this.createButtonClicked = false;
          this.showLoadingImage = false;
        },
        (error) => {
          this.showFeatureCreatedFailure = true;
          this.createButtonClicked = false;
          this.showLoadingImage = false;
        }
      );
  }

  editFeature(){
    this.editFeatureButtonClicked = true;
    if(this.editFeatureForm.invalid){
      return;
    }
    this.featureToEdit.filename = this.editFeatureForm.get('filename').value;
    this.featureToEdit.title = this.editFeatureForm.get('title').value;
    this.featureToEdit.story = this.editFeatureForm.get('story').value;
    this.showLoadingImage = true;
    this.featuresService.updateFeature(this.featureToEdit)
      .subscribe(
        (feature) => {
          let index = this.features.map(
            (x) => {
              return x._id;
            }
          ).indexOf(feature._id);
          this.features.splice(index, 1, feature);
          this.editFeatureForm.reset();
          this.editFeatureButtonClicked = false;
          this.display = 'none';
          this.showLoadingImage = false;
        },
        (error) => {
          this.showFeatureEditFailure = true;
          this.editFeatureButtonClicked = false;
          this.display = 'none';
          this.showLoadingImage = false;
        }
      );
  }

  deleteFeature(featureId: string){
    if(confirm('Are you sure you want to delete this feature?')){
      this.showLoadingImage = true;
      this.featuresService.deleteFeature(featureId)
        .subscribe(
          (feature) => {
            let index = this.features.map(
              (x) => {
                return x._id;
              }
            ).indexOf(feature._id);
            this.features.splice(index, 1);
            this.showLoadingImage = false;
          },
          (error) => {
            this.showFeatureDeleteFailure = true;
            this.showLoadingImage = false;
          }
        );
    }
  }

  selectFeature(feature: FeatureModel){
    this.navigationStateService.announceFeatureSelected(feature);
  }

}
