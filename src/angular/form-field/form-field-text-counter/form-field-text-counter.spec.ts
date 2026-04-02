import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFormFieldTextCounter } from './form-field-text-counter';

describe('sbb-form-field-text-counter', () => {
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
  template: `<sbb-form-field-text-counter></sbb-form-field-text-counter>`,
  imports: [SbbFormFieldTextCounter],
})
class TestComponent {}
