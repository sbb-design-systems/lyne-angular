import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTeaserPanel } from './teaser-panel';

describe('sbb-teaser-panel', () => {
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
  template: `<sbb-teaser-panel></sbb-teaser-panel>`,
  imports: [SbbTeaserPanel],
})
class TestComponent {}
