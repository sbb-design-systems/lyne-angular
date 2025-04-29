import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAccentButtonStatic } from './accent-button-static';

describe('sbb-accent-button-static', () => {
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
  template: `<sbb-accent-button-static></sbb-accent-button-static>`,
  imports: [SbbAccentButtonStatic],
})
class TestComponent {}
