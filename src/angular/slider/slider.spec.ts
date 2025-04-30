import { Component, ViewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { SbbIcon } from '../icon';

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
    expect(component.slider.value).toBe('10');

    component.control.setValue('120');
    expect(component.slider.value).toBe('100');

    component.control.setValue('-20');
    expect(component.slider.value).toBe('0');
  });
});

@Component({
  template: `<sbb-slider [formControl]="control" min="0" max="100" />`,
  imports: [SbbSlider, SbbIcon, ReactiveFormsModule],
})
class TestComponent {
  @ViewChild(SbbSlider, { static: true }) slider!: SbbSlider;
  control = new FormControl('10');
}
