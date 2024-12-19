import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbExpansionPanelDirective } from './expansion-panel.js';

describe('SbbExpansionPanelDirective', () => {
  let component: SbbExpansionPanelDirective;
  let fixture: ComponentFixture<SbbExpansionPanelDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbExpansionPanelDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
