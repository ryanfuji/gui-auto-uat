import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input('step')
  stepString: string;

  stepStringArray: Array<string>;

  @Input('type')
  stepType: string;

  @Output('processedStep')
  finalizedStep = new EventEmitter<string>();

  stepForm: FormGroup;

  addButtonClicked: boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.stepStringArray = this.stepString.split('%N%');
    this.createForm();
  }

  createForm(){
    switch (this.stepStringArray.length){
      case 4:
        this.stepForm = this.formBuilder.group({
          firstVariable: ['', Validators.required],
          secondVariable: ['', Validators.required],
          thirdVariable: ['', Validators.required]
        });
        break;
      case 3:
        this.stepForm = this.formBuilder.group({
          firstVariable: ['', Validators.required],
          secondVariable: ['', Validators.required]
        });
        break;
      case 2:
        this.stepForm = this.formBuilder.group({
          firstVariable: ['', Validators.required]
        });
    }
  }

  addStep(){
    this.addButtonClicked = true;
    if(this.stepForm){
      if(this.stepForm.invalid){
        return;
      }
      this.combineStringWithInputs();
    } else {
      this.finalizedStep.emit(this.stepType + ' ' + this.stepStringArray[0]);
    }
  }

  combineStringWithInputs(){
    switch (this.stepStringArray.length){
      case 4:
        this.finalizedStep.emit(this.stepType + ' ' + this.stepStringArray[0] +
          this.stepForm.get('firstVariable').value + this.stepStringArray[1] + this.stepForm.get('secondVariable').value
          + this.stepStringArray[2] + this.stepForm.get('thirdVariable').value + this.stepStringArray[3]);
        break;
      case 3:
        this.finalizedStep.emit(this.stepType + ' ' + this.stepStringArray[0] +
          this.stepForm.get('firstVariable').value + this.stepStringArray[1] + this.stepForm.get('secondVariable').value
          + this.stepStringArray[2]);
        break;
      case 2:
        this.finalizedStep.emit(this.stepType + ' ' + this.stepStringArray[0] +
          this.stepForm.get('firstVariable').value + this.stepStringArray[1]);
    }
  }

}
