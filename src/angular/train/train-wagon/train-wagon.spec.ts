import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTrainWagonDirective } from './train-wagon.js';

describe('SbbTrainWagonDirective', () => {
  let component: SbbTrainWagonDirective;
  let fixture: ComponentFixture<SbbTrainWagonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTrainWagonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
