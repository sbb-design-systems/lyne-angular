import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { map } from 'rxjs/operators';

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
  protected form = inject(FormBuilder).nonNullable.group({
    multi: false,
    smallSize: false,
    iconPanel: false,
    disablePanel: false,
  });

  protected readonly multi = toSignal(this.form.controls.multi.valueChanges, {
    initialValue: false,
  });
  protected readonly size = toSignal(
    this.form.controls.smallSize.valueChanges.pipe(map((size): 's' | 'l' => (size ? 's' : 'l'))),
    { initialValue: 'l' },
  );
  protected readonly iconPanel = toSignal(this.form.controls.iconPanel.valueChanges, {
    initialValue: false,
  });
  protected readonly disablePanel = toSignal(this.form.controls.disablePanel.valueChanges, {
    initialValue: false,
  });
}
