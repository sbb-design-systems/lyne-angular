import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { SbbSlider } from './slider';

describe('sbb-slider', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
    expect(component.slider()!.value).toBe('10');
  });

  it('should update state of component on form value change', async () => {
    component.control.setValue('120');
    expect(component.slider()!.value).toBe('100');

    component.control.setValue('-20');
    expect(component.slider()!.value).toBe('0');
  });
});

@Component({
  template: `<sbb-slider [formControl]="control" min="0" max="100" />`,
  imports: [SbbSlider, ReactiveFormsModule],
})
class TestComponent {
  slider = viewChild(SbbSlider);
  control = new FormControl('10');
}
