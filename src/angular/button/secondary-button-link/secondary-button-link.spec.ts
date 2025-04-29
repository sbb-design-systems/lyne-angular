import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSecondaryButtonLink } from './secondary-button-link';

describe('sbb-secondary-button-link', () => {
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
  template: `<sbb-secondary-button-link></sbb-secondary-button-link>`,
  imports: [SbbSecondaryButtonLink],
})
class TestComponent {}
