import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbExpansionPanelHeader } from './expansion-panel-header';

describe('sbb-expansion-panel-header', () => {
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
  template: `<sbb-expansion-panel-header></sbb-expansion-panel-header>`,
  imports: [SbbExpansionPanelHeader],
})
class TestComponent {}
