import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepsService } from '../../../services/steps.service';
import { StepModel } from '../../../models/step.model';
import { ScenarioModel } from '../../../models/scenario.model';
import { ScenariosService } from '../../../services/scenarios.service';
import { NavigationStateService } from '../../../services/navigation-state.service';
import { ScenarioStateService } from '../../../services/scenario-state.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-create-scenario',
  templateUrl: './create-scenario.component.html',
  styleUrls: ['./create-scenario.component.css']
})
export class CreateScenarioComponent implements OnInit {

  givenSteps: Array<string> = [];
  whenSteps: Array<string> = [];
  thenSteps: Array<string> = [];

  finalGivenSteps: Array<string> = [];
  finalWhenSteps: Array<string> = [];
  finalThenSteps: Array<string> = [];

  givenType: string = "Given";
  whenType: string = "When";
  thenType: string = "Then";

  showLoadingImage: boolean = true;
  showLoadingStepsError: boolean = false;
  showCreateScenarioError: boolean = false;

  scenarioForm: FormGroup;

  showGivenSelect: boolean = true;
  showGivenAdd: boolean = false;
  showWhenSelect: boolean = false;
  showWhenAdd: boolean = false;
  showThenSelect: boolean = false;
  showThenAdd: boolean = false;

  creatingGiven: boolean = true;
  creatingWhen: boolean = false;
  creatingThen: boolean = false;

  givenSelected: string;
  whenSelected: string;
  thenSelected: string;

  createButtonClicked: boolean = false;

  constructor(private stepsService: StepsService,
    private formBuilder: FormBuilder,
    private scenariosService: ScenariosService,
    private navigationStateService: NavigationStateService,
    private scenarioStateService: ScenarioStateService) {
    this.createForm();
  }

  ngOnInit() {
    feather.replace();
    this.stepsService.getAll()
      .subscribe(
        (steps) => {
          this.separateSteps(steps);
        },
        (error) => {
          this.showLoadingStepsError = true;
          this.showLoadingImage = false;
        }
      );
  }

  goBackToScenarioHome(){
    this.scenarioStateService.announceComponentToOpen('scenarioHome');
  }

  separateSteps(steps: Array<StepModel>){
    for(let step of steps){
      if(step.type === 'given'){
        this.givenSteps.push(step.step);
      }
      if(step.type === 'when'){
        this.whenSteps.push(step.step);
      }
      if(step.type === 'then'){
        this.thenSteps.push(step.step);
      }
    }
    this.showLoadingImage = false;
  }

  createForm(){
    this.scenarioForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  selectedGiven(step: string){
    this.givenSelected = step;
    this.showGivenSelect = false;
    this.showGivenAdd = true;
  }

  selectedWhen(step: string){
    this.whenSelected = step;
    this.showWhenSelect = false;
    this.showWhenAdd = true;
  }

  selectedThen(step: string){
    this.thenSelected = step;
    this.showThenSelect = false;
    this.showThenAdd = true;
  }

  handleGivenStep(givenStep: string){
    if(givenStep === null){
      this.showGivenSelect = true;
      this.showGivenAdd = false;
      return;
    }
    if(this.finalGivenSteps.length > 0){
      this.finalGivenSteps.push(givenStep.replace('Given', 'And'));
    } else {
      this.finalGivenSteps.push(givenStep);
    }
    this.showGivenSelect = true;
    this.showGivenAdd = false;
  }

  handleWhenStep(whenStep: string){
    if(whenStep === null){
      this.showWhenSelect = true;
      this.showWhenAdd = false;
      return;
    }
    if(this.finalWhenSteps.length > 0){
      this.finalWhenSteps.push(whenStep.replace('When', 'And'));
    } else {
      this.finalWhenSteps.push(whenStep);
    }
    this.showWhenSelect = true;
    this.showWhenAdd = false;
  }

  handleThenStep(thenStep: string){
    if(thenStep === null){
      this.showThenSelect = true;
      this.showThenAdd = false;
      return;
    }
    if(this.finalThenSteps.length > 0){
      this.finalThenSteps.push(thenStep.replace('Then', 'And'));
    } else {
      this.finalThenSteps.push(thenStep);
    }
    this.showThenSelect = true;
    this.showThenAdd = false;
  }

  moveToWhen(){
    this.showGivenAdd = false;
    this.showGivenSelect = false;
    this.creatingGiven = false;
    this.creatingWhen = true;
    this.showWhenSelect = true;
  }

  moveToThen(){
    this.creatingWhen = false;
    this.showWhenSelect = false;
    this.showWhenAdd = false;
    this.creatingThen = true;
    this.showThenSelect = true;
  }

  saveScenario(){
    this.createButtonClicked = true;
    if(this.scenarioForm.invalid || this.finalGivenSteps.length === 0 ||
      this.finalThenSteps.length === 0){
      return;
    }
    this.showLoadingImage = true;
    let scenarioModel = new ScenarioModel();
    scenarioModel.featureId = this.navigationStateService.featureIdSelected;
    scenarioModel.projectId = this.navigationStateService.projectIdSelected;
    scenarioModel.suiteId = this.navigationStateService.suiteIdSelected;
    scenarioModel.title = this.scenarioForm.get('title').value;
    scenarioModel.steps = this.combineFinalSteps();
    this.scenariosService.createScenario(scenarioModel)
      .subscribe(
        (scenario) => {
          this.showLoadingImage = false;
          this.scenarioStateService.announceComponentToOpen('scenarioHome');
        },
        (error) => {
          this.showCreateScenarioError = true;
          this.showLoadingImage = false;
        }
      );
  }

  combineFinalSteps(): Array<string>{
    let steps = []
    for(let givenStep of this.finalGivenSteps){
      steps.push(givenStep);
    }
    for(let whenStep of this.finalWhenSteps){
      steps.push(whenStep);
    }
    for(let thenStep of this.finalThenSteps){
      steps.push(thenStep);
    }
    return steps;
  }

  restartGiven(){
    this.finalGivenSteps = [];
    this.showGivenSelect = true;
    this.showGivenAdd = false;
  }

  moveBackToGiven(){
    this.finalWhenSteps = [];
    this.creatingWhen = false;
    this.showWhenAdd = false;
    this.showWhenSelect = false;
    this.creatingGiven = true;
    this.showGivenSelect = true;
  }

  moveBackToWhen(){
    this.finalThenSteps = [];
    this.creatingThen = false;
    this.showThenSelect = false;
    this.showThenAdd = false;
    this.creatingWhen = true;
    this.showWhenSelect = true;
  }

}
