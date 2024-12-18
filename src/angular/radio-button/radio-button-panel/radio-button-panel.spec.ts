import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbRadioButtonPanelDirective } from './radio-button-panel.js';

describe('SbbRadioButtonPanelDirective', () => {
  let component: SbbRadioButtonPanelDirective;
  let fixture: ComponentFixture<SbbRadioButtonPanelDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbRadioButtonPanelDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
