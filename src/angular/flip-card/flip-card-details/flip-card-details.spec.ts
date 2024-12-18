import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFlipCardDetailsDirective } from './flip-card-details.js';

describe('SbbFlipCardDetailsDirective', () => {
  let component: SbbFlipCardDetailsDirective;
  let fixture: ComponentFixture<SbbFlipCardDetailsDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFlipCardDetailsDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
