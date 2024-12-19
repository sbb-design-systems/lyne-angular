import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTrainDirective } from './train.js';

describe('SbbTrainDirective', () => {
  let component: SbbTrainDirective;
  let fixture: ComponentFixture<SbbTrainDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTrainDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
