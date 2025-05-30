import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbVisualCheckbox } from './visual-checkbox';

describe('sbb-visual-checkbox', () => {
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
  template: `<sbb-visual-checkbox></sbb-visual-checkbox>`,
  imports: [SbbVisualCheckbox],
})
class TestComponent {}
