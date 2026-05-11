import { Component, FormBuilder, ReactiveFormsModule } from '@angular/core';
import { SbbBreadcrumbModule } from '@sbb-esta/lyne-angular/breadcrumb';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { map } from 'rxjs/operators';

/**
 * @title Basic breadcrumb
 */
@Component({
  selector: 'sbb-breadcrumb-basic-example',
  templateUrl: 'breadcrumb-basic-example.html',
  styleUrl: 'breadcrumb-basic-example.scss',
  imports: [
    SbbBreadcrumbModule,
    SbbRadioButtonModule,
    SbbCheckboxModule,
    SbbTitleModule,
    ReactiveFormsModule,
  ],
})
export class BreadcrumbBasicExample {
  protected form = inject(FormBuilder).nonNullable.group({
    iconName: '',
    targetBlank: false,
    externalLink: false,
  });

  protected readonly iconName = toSignal(this.form.controls.iconName.valueChanges, {
    initialValue: this.form.controls.iconName.value,
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
