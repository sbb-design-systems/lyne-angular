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
    expect(component.slider().value).toBe('10');
  });

  it('should update state of component on form value change', async () => {
    component.control.setValue('120');
    expect(component.slider().value).toBe('100');

    component.control.setValue('-20');
    expect(component.slider().value).toBe('0');
  });

  it('should update form control', async () => {
    const slider = (fixture.nativeElement as HTMLElement).querySelector('sbb-slider')!;
    slider.valueAsNumber = 30;
    slider.dispatchEvent(new Event('change'));
    expect(component.slider().value).toBe('30');
  });

  it('should be touched on blur', async () => {
    expect(component.control.touched).toBe(false);

    (fixture.nativeElement as HTMLElement)
      .querySelector('sbb-slider')!
      .dispatchEvent(new FocusEvent('blur'));

    expect(component.control.touched).toBe(true);
  });
});

@Component({
  template: `<sbb-slider [formControl]="control" min="0" max="100" />`,
  imports: [SbbSlider, ReactiveFormsModule],
})
class TestComponent {
  slider = viewChild.required(SbbSlider);
  control = new FormControl('10');
}
