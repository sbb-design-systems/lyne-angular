import { Component, viewChild, viewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { SbbOptionElement } from '@sbb-esta/lyne-elements/option/option.js';

import { SbbOption } from '../option/option';

import { SbbSelect } from './select';

describe('sbb-select', () => {
  describe('single', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(component.select().value).toEqual('2');
      expect(component.select().getDisplayValue()).toEqual('Option 2');
      expect(component.options().find((o) => o.value === '2')!.selected).toBeTrue();
    });

    it('should select an option', async () => {
      component.select()!.open();
      fixture.detectChanges();

      (fixture.nativeElement as HTMLElement)
        .querySelector<SbbOptionElement>('sbb-option[value="1"]')!
        .click();
      fixture.detectChanges();

      expect(component.select().value).toEqual('1');
      expect(component.options().find((o) => o.value === '1')!.selected).toBeTrue();
      expect(component.control.value).toEqual('1');
    });

    it('should react to form control change', async () => {
      component.select().open();
      fixture.detectChanges();
      await fixture.whenStable();

      component.control.setValue('1');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.select().value).toEqual('1');
      expect(component.options().find((o) => o.value === '1')!.selected).toBeTrue();
      expect(component.control.value).toEqual('1');
    });

    it('should be touched on close', async () => {
      component.select().open();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.control.touched).toBeFalse();

      component.select().close();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.control.touched).toBeTrue();
    });

    it('should be touched on blur', async () => {
      component.select().open();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.control.touched).toBeFalse();

      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-select')!
        .dispatchEvent(new FocusEvent('blur'));

      expect(component.control.touched).toBeTrue();
    });
  });

  describe('multiple', () => {
    let fixture: ComponentFixture<TestComponentMultiple>, component: TestComponentMultiple;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponentMultiple);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle multiple initialization', async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.select().value).toEqual(['1', '2']);
      expect(component.options().filter((o) => o.selected).length).toBe(2);

      component.select().open();
      fixture.detectChanges();

      (fixture.nativeElement as HTMLElement)
        .querySelector<SbbOptionElement>('sbb-option[value="1"]')!
        .click();
      fixture.detectChanges();

      expect(component.select().value).toEqual(['2']);
      expect(component.control.value).toEqual(['2']);
    });
  });
});

@Component({
  template: `<sbb-select [formControl]="control">
    @for (opt of [1, 2, 3]; track opt) {
      <sbb-option value="{{ opt }}">Option {{ opt }}</sbb-option>
    }
  </sbb-select>`,
  imports: [SbbSelect, SbbOption, ReactiveFormsModule],
})
class TestComponent {
  select = viewChild.required(SbbSelect);
  options = viewChildren(SbbOption);
  control = new FormControl('2');
}

@Component({
  template: `<sbb-select [formControl]="control" multiple>
    @for (opt of [1, 2, 3]; track opt) {
      <sbb-option value="{{ opt }}">Option {{ opt }}</sbb-option>
    }
  </sbb-select>`,
  imports: [SbbSelect, SbbOption, ReactiveFormsModule],
})
class TestComponentMultiple {
  select = viewChild.required(SbbSelect);
  options = viewChildren(SbbOption);
  control = new FormControl(['1', '2']);
}
