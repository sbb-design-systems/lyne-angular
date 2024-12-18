import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTrainFormationDirective } from './train-formation.js';

describe('SbbTrainFormationDirective', () => {
  let component: SbbTrainFormationDirective;
  let fixture: ComponentFixture<SbbTrainFormationDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTrainFormationDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
