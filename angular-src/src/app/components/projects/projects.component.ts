import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { ProjectModel } from '../../models/project.model';
import { NavigationStateService } from '../../services/navigation-state.service';
import * as feather from 'feather-icons';
import { FeatureRunnerService } from '../../services/feature-runner.service';
import { ResultsService } from '../../services/results.service';
import { ResultsStateService } from '../../services/results-state.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewChecked {

  showLoadingImage: boolean = true;
  projects: Array<ProjectModel> = [];
  showLoadingProjectsError: boolean = false;
  showProjectCreatedFailure: boolean = false;
  showProjectDeleteFailure: boolean = false;
  showProjectEditFailure: boolean = false;
  projectForm: FormGroup;
  createButtonClicked: boolean = false;
  display: string = 'none';
  projectToEdit: ProjectModel;
  editProjectForm: FormGroup;
  addModalToDom: boolean = false;
  editProjectButtonClicked: boolean = false;
  showProjectGenerateFeaturesFailure: boolean = false;
  showProjectGenerateFeaturesSuccess: boolean = false;
  showProjectRunFeaturesFailure: boolean = false;
  showRunFeaturesSuccess: boolean = false;

  constructor(private projectsSevice: ProjectsService,
    private formBuilder: FormBuilder,
    private navigationStateService: NavigationStateService,
    private featureRunnerService: FeatureRunnerService,
    private resultsService: ResultsService,
    private resultsStateService: ResultsStateService) {
      this.createProjectForm();
  }

  ngOnInit() {
    feather.replace();
    this.showLoadingImage = true;
    this.projectsSevice.getAllProjects()
      .subscribe(
        (projects) => {
          this.projects = projects;
          this.showLoadingImage = false;
        },
        (error) => {
          this.showLoadingProjectsError = true;
          this.showLoadingImage = false;
        }
      )
  }

  ngAfterViewChecked(){
    feather.replace();
  }

  createProjectForm(){
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  createEditProjectForm(){
    this.editProjectForm = this.formBuilder.group({
      title: [this.projectToEdit.title, Validators.required]
    });
  }

  createNewProject(){
    this.createButtonClicked = true;
    if(this.projectForm.invalid){
      return;
    }
    this.showLoadingImage = true;
    let projectModel = new ProjectModel();
    projectModel.title = this.projectForm.get('title').value;
    this.projectsSevice.createProject(projectModel)
      .subscribe(
        (project) => {
          this.projects.unshift(project);
          this.projectForm.reset();
          this.createButtonClicked = false;
          this.showLoadingImage = false;
        },
        (error) => {
          this.createButtonClicked = false;
          this.showProjectCreatedFailure = true;
          this.showLoadingImage = false;
        }
      );
  }

  openModal(project: ProjectModel){
    this.projectToEdit = project;
    this.createEditProjectForm();
    this.addModalToDom = true;
    this.display='block';
  }

  closeModal(){
    this.projectToEdit = null;
    this.display='none';
  }

  editProject(){
    this.editProjectButtonClicked = true;
    if(this.editProjectForm.invalid){
      return;
    }
    this.showLoadingImage = true;
    this.projectToEdit.title = this.editProjectForm.get('title').value;
    this.projectsSevice.editProject(this.projectToEdit)
      .subscribe(
        (project) => {
          let index = this.projects.map(
            (x) => {
              return x._id;
            }
          ).indexOf(project._id);
          this.projects.splice(index, 1, project);
          this.editProjectForm.reset();
          this.editProjectButtonClicked = false;
          this.display = 'none';
          this.showLoadingImage = false;
        },
        (error) => {
          this.showProjectEditFailure = true;
          this.editProjectButtonClicked = false;
          this.display = 'none';
          this.showLoadingImage = false;
        }
      );
  }

  deleteProject(projectId: string) {
    if(confirm('Are you sure you want to delete this project?')){
      this.showLoadingImage = true;
      this.projectsSevice.deleteProject(projectId)
        .subscribe(
          (project) => {
            if(project._id === this.navigationStateService.projectIdSelected){
              this.navigationStateService.announceProjectSelected(null);
            }
            let index = this.projects.map(
              (x) => {
                return x._id;
              }
            ).indexOf(project._id);
            this.projects.splice(index, 1);
            this.showLoadingImage = false;
          },
          (error) => {
            this.showProjectDeleteFailure = true;
            this.showLoadingImage = false;
          }
        );
    }
  }

  selectProject(project: ProjectModel){
    this.navigationStateService.announceProjectSelected(project);
  }

  generateFeatures(projectId: string){
    this.showLoadingImage = true;
    this.projectsSevice.generateFeatures(projectId)
      .subscribe(
        (success) => {
          this.showProjectGenerateFeaturesSuccess = true;
          this.showLoadingImage = false;
        },
        (error) => {
          this.showProjectGenerateFeaturesFailure = true;
          this.showLoadingImage = false;
        }
      );
  }

  runFeatures(projectId: string, projectTitle: string){
    this.showLoadingImage = true;
    this.projectsSevice.generateFeatures(projectId)
      .subscribe(
        (success) => {
          this.featureRunnerService.runFeatures()
            .subscribe(
              (result) => {
                this.generateResults(projectId, projectTitle);
              },
              (error) => {
                this.generateResults(projectId, projectTitle);
              }
            );
        },
        (error) => {
          this.showProjectGenerateFeaturesFailure = true;
          this.showLoadingImage = false;
        }
      );
  }

  generateResults(projectId: string, projectTitle: string){
    this.resultsService.createResult(projectId, projectTitle)
      .subscribe(
        (result) => {
          this.showRunFeaturesSuccess = true;
          this.resultsStateService.announceNewTestResult();
          this.showLoadingImage = false;
        },
        (error) => {
          this.showProjectRunFeaturesFailure = true;
          this.showLoadingImage = false;
        }
      )
  }

}
