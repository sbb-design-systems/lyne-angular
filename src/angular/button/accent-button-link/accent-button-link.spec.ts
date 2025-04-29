import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAccentButtonLink } from './accent-button-link';

describe('sbb-accent-button-link', () => {
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
  template: `<sbb-accent-button-link></sbb-accent-button-link>`,
  imports: [SbbAccentButtonLink],
})
class TestComponent {}
