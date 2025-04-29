import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTransparentButtonLink } from './transparent-button-link';

describe('sbb-transparent-button-link', () => {
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
  template: `<sbb-transparent-button-link></sbb-transparent-button-link>`,
  imports: [SbbTransparentButtonLink],
})
class TestComponent {}
