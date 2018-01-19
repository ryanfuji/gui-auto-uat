import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitesComponent } from './suites.component';

describe('SuitesComponent', () => {
  let component: SuitesComponent;
  let fixture: ComponentFixture<SuitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
