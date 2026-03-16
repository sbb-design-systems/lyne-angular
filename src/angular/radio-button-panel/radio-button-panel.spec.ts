import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbRadioButtonPanel } from './radio-button-panel';

describe('sbb-radio-button-panel', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-radio-button-panel></sbb-radio-button-panel>`,
  imports: [SbbRadioButtonPanel],
})
class TestComponent {}
