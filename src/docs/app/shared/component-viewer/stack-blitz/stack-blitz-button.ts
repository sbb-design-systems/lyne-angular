import { Directive, effect, inject, input, NgZone, signal, untracked } from '@angular/core';
import type { SbbToast } from '@sbb-esta/lyne-angular/toast';
import { SbbToastService } from '@sbb-esta/lyne-angular/toast';

import { VariantSwitch } from '../../../variant-switch';
import type { ExampleData } from '../../example-data';

import { StackBlitzMessage } from './stack-blitz-message';
import { StackBlitzWriter } from './stack-blitz-writer';

@Directive({
  selector: 'sbb-secondary-button[sbb-stack-blitz-button]',
  host: {
    '(click)': 'openStackBlitz()',
  },
})
export class StackBlitzButton {
  #stackBlitzWriter = inject(StackBlitzWriter);
  #ngZone = inject(NgZone);
  #variantSwitch = inject(VariantSwitch);
  #toastService = inject(SbbToastService);

  /**
   * Function that can be invoked to open the StackBlitz window synchronously.
   *
   * **Note**: All files for the StackBlitz need to be loaded and prepared ahead-of-time,
   * because doing so on-demand will cause Firefox to block the submit as a popup as the
   * form submission (used internally to create the StackBlitz) didn't happen within the
   * same tick as the user interaction.
   */
  #openStackBlitzFn = signal<((isSbbLean: boolean) => void) | null>(null);

  exampleData = input.required<ExampleData>();

  constructor() {
    effect(() => {
      const data = this.exampleData();

      untracked(() => this.#openStackBlitzFn.set(null));

      if (data) {
        this.#ngZone.runOutsideAngular(async () => {
          this.#openStackBlitzFn.set(await this.#stackBlitzWriter.createStackBlitzForExample(data));
        });
      }
    });
  }

  openStackBlitz(): void {
    const openStackBlitzFn = this.#openStackBlitzFn();

    if (openStackBlitzFn) {
      openStackBlitzFn(this.#variantSwitch.sbbVariant.value === 'lean');
    } else {
      this.#toastService.open(StackBlitzMessage, {
        setupContainer: (sbbToast: SbbToast) => {
          sbbToast.readOnly = true;
          sbbToast.timeout = 2000;
        },
      });
    }
  }
}
