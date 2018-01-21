import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ScenarioStateService } from '../../services/scenario-state.service';
import { ScenariosService } from '../../services/scenarios.service';
import { StepsService } from '../../services/steps.service';
import { StepModel } from '../../models/step.model';
import { ScenarioModel } from '../../models/scenario.model';
import { NavigationStateService } from '../../services/navigation-state.service';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.css']
})
export class ScenariosComponent implements OnInit, AfterViewChecked {

  showLoadingImage: boolean = true;
  scenarios: Array<ScenarioModel> = [];
  showLoadingScenariosError: boolean = false;
  showDeleteScenarioError: boolean = false;
  componentToOpen: string = 'scenarioHome';
  scenarioToView: ScenarioModel;
  display: string = 'none';
  addModalToDom: boolean = false;

  constructor(private scenariosService: ScenariosService,
    private navigationStateService: NavigationStateService,
    private scenarioStateService: ScenarioStateService) {

  }

  ngOnInit() {
    feather.replace();
    this.getAllScenarios();
    this.scenarioStateService.componentToOpen$
      .subscribe(
        (componentName) => {
          this.componentToOpen = componentName;
          if(componentName === 'scenarioHome'){
            this.getAllScenarios();
          }
        }
      );
  }

  ngAfterViewChecked(){
    feather.replace();
  }

  getAllScenarios(){
    this.scenariosService.getAllByFeatureId(this.navigationStateService.featureIdSelected)
      .subscribe(
        (scenarios) => {
          this.scenarios = scenarios;
          this.showLoadingImage = false;
        },
        (error) => {
          this.showLoadingScenariosError = true;
          this.showLoadingImage = false;
        }
      );
  }

  viewScenario(scenario: ScenarioModel){
    this.scenarioToView = scenario;
    this.addModalToDom = true;
    this.openModal();
  }

  openModal(){
    this.display='block';
  }

  closeModal(){
    this.addModalToDom = false;
    this.scenarioToView = null;
    this.display='none';
  }

  deleteScenario(scenarioId: string){
    if(confirm('Are you sure you want to delete this scenario?')){
      this.showLoadingImage = true;
      this.scenariosService.deleteScenario(scenarioId)
        .subscribe(
          (scenario) => {
            let index = this.scenarios.map(
              (x) => {
                return x._id;
              }
            ).indexOf(scenario._id);
            this.scenarios.splice(index, 1);
            this.showLoadingImage = false;
          },
          (error) => {
            this.showDeleteScenarioError = true;
            this.showLoadingImage = false;
          }
        );
    }
  }

  createNewScenario(){
    this.scenarioStateService.announceComponentToOpen('createScenario');
  }

}
