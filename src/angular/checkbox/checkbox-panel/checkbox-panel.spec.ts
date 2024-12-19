import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCheckboxPanelDirective } from './checkbox-panel.js';

describe('SbbCheckboxPanelDirective', () => {
  let component: SbbCheckboxPanelDirective;
  let fixture: ComponentFixture<SbbCheckboxPanelDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCheckboxPanelDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
