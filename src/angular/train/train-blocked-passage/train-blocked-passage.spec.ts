import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTrainBlockedPassageDirective } from './train-blocked-passage.js';

describe('SbbTrainBlockedPassageDirective', () => {
  let component: SbbTrainBlockedPassageDirective;
  let fixture: ComponentFixture<SbbTrainBlockedPassageDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTrainBlockedPassageDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
