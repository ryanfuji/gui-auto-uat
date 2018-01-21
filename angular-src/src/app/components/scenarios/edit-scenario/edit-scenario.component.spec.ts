import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScenarioComponent } from './edit-scenario.component';

describe('EditScenarioComponent', () => {
  let component: EditScenarioComponent;
  let fixture: ComponentFixture<EditScenarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScenarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
