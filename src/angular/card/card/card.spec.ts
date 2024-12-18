import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCardDirective } from './card.js';

describe('SbbCardDirective', () => {
  let component: SbbCardDirective;
  let fixture: ComponentFixture<SbbCardDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCardDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
