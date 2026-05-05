import { computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  form = new FormGroup({
    multi: new FormControl(false, { nonNullable: true }),
    smallSize: new FormControl(false, { nonNullable: true }),
    iconPanel: new FormControl(false, { nonNullable: true }),
    disablePanel: new FormControl(false, { nonNullable: true }),
  });

  readonly #formValue = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });

  protected readonly multi = computed(() => this.#formValue().multi ?? false);
  protected readonly iconPanel = computed(() => this.#formValue().iconPanel ?? false);
  protected readonly disablePanel = computed(() => this.#formValue().disablePanel ?? false);
  protected readonly size = computed(() => (this.#formValue().smallSize ? 's' : 'l') as 's' | 'l');
}
