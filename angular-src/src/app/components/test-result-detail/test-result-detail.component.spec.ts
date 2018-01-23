import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultDetailComponent } from './test-result-detail.component';

describe('TestResultDetailComponent', () => {
  let component: TestResultDetailComponent;
  let fixture: ComponentFixture<TestResultDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestResultDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
