import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSelectionExpansionPanelDirective } from './selection-expansion-panel.js';

describe('SbbSelectionExpansionPanelDirective', () => {
  let component: SbbSelectionExpansionPanelDirective;
  let fixture: ComponentFixture<SbbSelectionExpansionPanelDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbSelectionExpansionPanelDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
