import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-accordion with properties
 */
@Component({
  selector: 'sbb-accordion-variants-example',
  templateUrl: 'accordion-variants-example.html',
  imports: [SbbAccordionModule, SbbCheckboxModule, SbbTitleModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionVariantsExample {
  readonly #fb = inject(FormBuilder);

  protected form = this.#fb.nonNullable.group({
    multi: false,
    smallSize: false,
    iconPanel: false,
    disablePanel: false,
  });

  readonly #smallSize = toSignal(this.form.controls.smallSize.valueChanges, {
    initialValue: false,
  });
  protected readonly size = computed((): 's' | 'l' => (this.#smallSize() ? 's' : 'l'));
  protected readonly multi = toSignal(this.form.controls.multi.valueChanges, {
    initialValue: false,
  });
  protected readonly iconPanel = toSignal(this.form.controls.iconPanel.valueChanges, {
    initialValue: false,
  });
  protected readonly disablePanel = toSignal(this.form.controls.disablePanel.valueChanges, {
    initialValue: false,
  });
}
