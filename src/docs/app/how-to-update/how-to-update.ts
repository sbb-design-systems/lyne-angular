import { Component, computed, effect, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbLink } from '@sbb-esta/lyne-angular/link';
import { SbbNotification } from '@sbb-esta/lyne-angular/notification';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

import { UPDATE_STEPS, type Version } from './update-steps';

@Component({
  selector: 'sbb-how-to-update',
  imports: [SbbTitle, SbbFormField, SbbLink, SbbNotification, SbbSelectModule, FormField],
  templateUrl: './how-to-update.html',
  styleUrl: './how-to-update.scss',
})
export class HowToUpdateComponent {
  readonly #domSanitizer = inject(DomSanitizer);
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);

  protected versions: string[] = [
    ...new Set([...UPDATE_STEPS.map((s) => this.toVersionString(s))]),
  ].sort();

  protected versionForm = form(
    signal({
      from: this.#fromQueryParam('from', this.versions.at(-2)!),
      to: this.#fromQueryParam('to', this.versions.at(-1)!),
    }),
  );

  protected updateSteps = computed(() =>
    UPDATE_STEPS.filter(
      (s) => this.#compareVersion(s, this.#from()) > 0 && this.#compareVersion(s, this.#to()) <= 0,
    ),
  );

  #from = computed(() => this.#toVersion(this.versionForm.from().value()));
  #to = computed(() => this.#toVersion(this.versionForm.to().value()));

  protected isSkipping = computed(() => this.#to().major - this.#from().major > 1);
  protected isDowngrading = computed(() => {
    const from = this.#from();
    const to = this.#to();

    return to.major < from.major || (to.major === from.major && to.minor < from.minor);
  });

  constructor() {
    effect(() => {
      this.#router.navigate([], {
        relativeTo: this.#activatedRoute,
        queryParams: {
          from: this.versionForm.from().value(),
          to: this.versionForm.to().value(),
        },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  protected toVersionString(v: Version): string {
    return `${v.major}.${v.minor}`;
  }

  protected toSafeHtml(html: string): SafeHtml {
    return this.#domSanitizer.bypassSecurityTrustHtml(html);
  }

  #toVersion(value: string): Version {
    const [major, minor] = value.split('.').map((v) => parseInt(v));
    return { major: major ?? 0, minor: minor ?? 0 };
  }

  #compareVersion(a: Version, b: Version): number {
    return a.major - b.major || a.minor - b.minor;
  }

  #fromQueryParam(param: string, defaultValue: string): string {
    const value = this.#activatedRoute.snapshot.queryParams[param];
    return this.versions.includes(value) ? value : defaultValue;
  }
}
