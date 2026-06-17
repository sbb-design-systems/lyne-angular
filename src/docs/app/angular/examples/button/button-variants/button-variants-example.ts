import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-button with configurable properties
 */
@Component({
  selector: 'sbb-button-variants-example',
  templateUrl: 'button-variants-example.html',
  imports: [
    ReactiveFormsModule,
    SbbButtonModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonVariantsExample {
  protected form = inject(FormBuilder).nonNullable.group({
    disabled: false,
    loading: false,
    label: true,
    icon: false,
    size: null,
  });

  protected readonly disabled = toSignal(this.form.controls.disabled.valueChanges, {
    initialValue: this.form.controls.disabled.value,
  });
  protected readonly loading = toSignal(this.form.controls.loading.valueChanges, {
    initialValue: this.form.controls.loading.value,
  });
  protected readonly label = toSignal(this.form.controls.label.valueChanges, {
    initialValue: this.form.controls.label.value,
  });
  protected readonly icon = toSignal(this.form.controls.icon.valueChanges, {
    initialValue: this.form.controls.icon.value,
  });
  protected readonly size = toSignal(this.form.controls.size.valueChanges, {
    initialValue: this.form.controls.size.value,
  });
}
