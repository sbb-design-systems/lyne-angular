import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbLink } from '@sbb-esta/lyne-angular/link';
import { SbbNotification } from '@sbb-esta/lyne-angular/notification';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

import { UPDATE_STEPS } from './update-steps';

@Component({
  selector: 'sbb-how-to-update',
  imports: [SbbTitle, SbbFormField, SbbLink, SbbNotification, SbbSelectModule, FormField],
  templateUrl: './how-to-update.html',
  styleUrl: './how-to-update.scss',
})
export class HowToUpdateComponent {
  readonly #domSanitizer = inject(DomSanitizer);

  protected versions: number[] = [
    ...new Set([...UPDATE_STEPS.map((s) => s.from), ...UPDATE_STEPS.map((s) => s.to)]),
  ].sort();

  protected versionForm = form(signal({ from: this.versions.at(-2)!, to: this.versions.at(-1)! }));

  protected updateSteps = computed(() =>
    UPDATE_STEPS.filter(
      (s) => this.versionForm.from().value() <= s.from && s.to <= this.versionForm.to().value(),
    ),
  );

  toVersionString(version: number) {
    return `${version / 100}.${version % 100}`;
  }

  toSafeHtml(html: string): SafeHtml {
    return this.#domSanitizer.bypassSecurityTrustHtml(html);
  }
}
