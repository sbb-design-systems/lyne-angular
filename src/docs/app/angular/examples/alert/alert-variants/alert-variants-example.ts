import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbAlertElement } from '@sbb-esta/lyne-elements/alert.js';

/**
 * @title sbb-alert with configurable properties
 */
@Component({
  selector: 'sbb-alert-variants-example',
  templateUrl: 'alert-variants-example.html',
  styleUrl: 'alert-variants-example.scss',
  imports: [
    ReactiveFormsModule,
    SbbAlertModule,
    SbbFormFieldModule,
    SbbLinkModule,
    SbbSelectModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertVariantsExample {
  protected form = inject(FormBuilder).nonNullable.group({
    iconName: 'info',
    readOnly: false,
    size: null as SbbAlertElement['size'] | null,
  });

  protected readonly iconName = toSignal(this.form.controls.iconName.valueChanges, {
    initialValue: this.form.controls.iconName.value,
  });
  protected readonly readOnly = toSignal(this.form.controls.readOnly.valueChanges, {
    initialValue: this.form.controls.readOnly.value,
  });
  protected readonly size = toSignal(this.form.controls.size.valueChanges, {
    initialValue: this.form.controls.size.value,
  });
}
