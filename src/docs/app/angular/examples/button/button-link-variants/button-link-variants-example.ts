import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { SbbButtonSize } from '@sbb-esta/lyne-elements/button.js';
import { map } from 'rxjs/operators';

/**
 * @title sbb-button-link with configurable properties
 */
@Component({
  selector: 'sbb-button-link-variants-example',
  templateUrl: 'button-link-variants-example.html',
  imports: [
    ReactiveFormsModule,
    SbbButtonModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbNotificationModule,
    SbbTitle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLinkVariantsExample {
  // FIXME: with lyne-elements v.5 the SbbButtonSize can be set to null to respect theme setting
  protected form = inject(FormBuilder).nonNullable.group({
    disabled: false,
    loading: false,
    label: true,
    icon: false,
    size: 'l' as SbbButtonSize,
    targetBlank: false,
    externalLink: false,
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
  protected readonly targetBlank = toSignal(
    this.form.controls.targetBlank.valueChanges.pipe(map((e) => (e ? '_blank' : ''))),
    { initialValue: '' },
  );
  protected readonly externalLink = toSignal(
    this.form.controls.externalLink.valueChanges.pipe(map((e) => (e ? 'https://www.sbb.ch' : '/'))),
    { initialValue: '/' },
  );
}
