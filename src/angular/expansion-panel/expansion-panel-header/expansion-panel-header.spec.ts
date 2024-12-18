import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbExpansionPanelHeaderDirective } from './expansion-panel-header.js';

describe('SbbExpansionPanelHeaderDirective', () => {
  let component: SbbExpansionPanelHeaderDirective;
  let fixture: ComponentFixture<SbbExpansionPanelHeaderDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbExpansionPanelHeaderDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
