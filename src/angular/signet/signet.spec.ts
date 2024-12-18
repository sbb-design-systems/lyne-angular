import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSignetDirective } from './signet.js';

describe('SbbSignetDirective', () => {
  let component: SbbSignetDirective;
  let fixture: ComponentFixture<SbbSignetDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbSignetDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
