import type { Signal } from '@angular/core';
import { Component, viewChild, viewChildren } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbOption } from '@sbb-esta/lyne-angular/option';
import type { SbbOptionElement } from '@sbb-esta/lyne-elements/option/option.js';

import { SbbSelect } from './select';
import { SbbSelectModule } from './select.module';

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

    it('should maintain state when detached and reattached to DOM', async () => {
      // Verify initial state
      expect(component.select()).toBeDefined();
      expect(component.select()!.value).toEqual('2');
      expect(component.control.value).toEqual('2');

      // Select a different option
      component.select()!.open();
      fixture.detectChanges();

      (fixture.nativeElement as HTMLElement)
        .querySelector<SbbOptionElement>('sbb-option[value="3"]')!
        .click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.select()!.value).toEqual('3');
      expect(component.control.value).toEqual('3');

      // Detach from DOM
      const sbbSelect = fixture.nativeElement.querySelector('sbb-select');

      expect(fixture.nativeElement.querySelector('.sbb-select-trigger')).toBeDefined();

      sbbSelect.remove();

      expect(fixture.nativeElement.querySelector('sbb-select')).toBeNull();
      expect(fixture.nativeElement.querySelector('.sbb-select-trigger')).toBeNull();

      // Reattach to DOM
      document.body.appendChild(sbbSelect);
      fixture.detectChanges();
      await fixture.whenStable();

      // Verify state is maintained
      expect(fixture.nativeElement.querySelector('sbb-select')).toBeDefined();
      expect(fixture.nativeElement.querySelector('.sbb-select-trigger')).toBeDefined();
      expect(component.select()).toBeDefined();
      expect(component.select()!.value).toEqual('3');
      expect(component.control.value).toEqual('3');
      expect(component.select()!.getDisplayValue()).toEqual('Option 3');
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

  describe('with complex value', () => {
    let fixture: ComponentFixture<TestComponentComplexValue>, component: TestComponentComplexValue;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponentComplexValue);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
      expect(component.select().value).toEqual(component.values[1]);
      expect(component.select().getDisplayValue()).toEqual('Option 2 (test 2)');
    });

    it('should select an option', async () => {
      component.select()!.open();
      fixture.detectChanges();

      const option1 = (fixture.nativeElement as HTMLElement).querySelector<SbbOptionElement>(
        'sbb-option',
      )!;

      option1.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.select().value).toEqual(component.values[0]);
      expect(component.options().find((o) => o.value === component.values[0])!.selected).toBeTrue();
      expect(component.control.value).toEqual(component.values[0]);
      expect(component.select().getDisplayValue()).toEqual('Option 1 (test 1)');
    });

    it('should react to form control change', async () => {
      component.select().open();
      fixture.detectChanges();
      await fixture.whenStable();

      component.control.setValue(component.values[2]);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.select().value).toEqual(component.values[2]);
      expect(component.options().find((o) => o.value === component.values[2])!.selected).toBeTrue();
      expect(component.control.value).toEqual(component.values[2]);
      expect(component.select().getDisplayValue()).toEqual('Option 3 (test 3)');
    });
  });
});

@Component({
  template: `<sbb-select [formControl]="control">
    @for (opt of [1, 2, 3]; track opt) {
      <sbb-option value="{{ opt }}">Option {{ opt }}</sbb-option>
    }
  </sbb-select>`,
  imports: [SbbSelectModule, ReactiveFormsModule],
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
  imports: [SbbSelectModule, ReactiveFormsModule],
})
class TestComponentMultiple {
  select = viewChild.required(SbbSelect);
  options = viewChildren(SbbOption);
  control = new FormControl(['1', '2']);
}

@Component({
  template: `<sbb-select [formControl]="control">
    @for (opt of values; track opt) {
      <sbb-option [value]="opt">{{ opt.property }} ({{ opt.otherProperty }})</sbb-option>
    }
  </sbb-select>`,
  imports: [SbbSelectModule, ReactiveFormsModule],
})
class TestComponentComplexValue {
  values = [
    { property: 'Option 1', otherProperty: 'test 1' },
    { property: 'Option 2', otherProperty: 'test 2' },
    { property: 'Option 3', otherProperty: 'test 3' },
  ];
  select: Signal<SbbSelect<(typeof this.values)[0]>> = viewChild.required(SbbSelect);
  options: Signal<readonly SbbOption<(typeof this.values)[0]>[]> = viewChildren(SbbOption);
  control = new FormControl(this.values[1]);
}
