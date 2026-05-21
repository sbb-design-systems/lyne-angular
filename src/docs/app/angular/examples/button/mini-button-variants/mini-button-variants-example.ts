import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-mini-button with configurable properties
 */
@Component({
  selector: 'sbb-mini-button-variants-example',
  templateUrl: 'mini-button-variants-example.html',
  imports: [
    ReactiveFormsModule,
    SbbButtonModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniButtonVariantsExample {
  protected form = inject(FormBuilder).nonNullable.group({
    disabled: false,
    label: false,
    icon: true,
  });

  protected readonly disabled = toSignal(this.form.controls.disabled.valueChanges, {
    initialValue: this.form.controls.disabled.value,
  });
  protected readonly label = toSignal(this.form.controls.label.valueChanges, {
    initialValue: this.form.controls.label.value,
  });
  protected readonly icon = toSignal(this.form.controls.icon.valueChanges, {
    initialValue: this.form.controls.icon.value,
  });
}
