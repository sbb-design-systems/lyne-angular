import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFlipCardDirective } from './flip-card.js';

describe('SbbFlipCardDirective', () => {
  let component: SbbFlipCardDirective;
  let fixture: ComponentFixture<SbbFlipCardDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbFlipCardDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
