import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbExpansionPanelContentDirective } from './expansion-panel-content.js';

describe('SbbExpansionPanelContentDirective', () => {
  let component: SbbExpansionPanelContentDirective;
  let fixture: ComponentFixture<SbbExpansionPanelContentDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbExpansionPanelContentDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
