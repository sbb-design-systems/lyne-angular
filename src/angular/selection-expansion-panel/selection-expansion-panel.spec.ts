import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSelectionExpansionPanel } from './selection-expansion-panel';

describe('sbb-selection-expansion-panel', () => {
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
  template: `<sbb-selection-expansion-panel></sbb-selection-expansion-panel>`,
  imports: [SbbSelectionExpansionPanel],
})
class TestComponent {}
