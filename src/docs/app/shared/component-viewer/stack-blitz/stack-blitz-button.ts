import { Directive, inject, Input, NgZone } from '@angular/core';
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
  @Input()
  set exampleData(exampleData: ExampleData) {
    if (exampleData) {
      this._prepareStackBlitzForExample(exampleData);
    } else {
      this._openStackBlitzFn = null;
    }
  }

  /**
   * Function that can be invoked to open the StackBlitz window synchronously.
   *
   * **Note**: All files for the StackBlitz need to be loaded and prepared ahead-of-time,
   * because doing so on-demand will cause Firefox to block the submit as a popup as the
   * form submission (used internally to create the StackBlitz) didn't happen within the
   * same tick as the user interaction.
   */
  private _openStackBlitzFn: ((isSbbLean: boolean) => void) | null = null;

  private _stackBlitzWriter: StackBlitzWriter = inject(StackBlitzWriter);
  private _ngZone: NgZone = inject(NgZone);
  private _variantSwitch = inject(VariantSwitch);
  private _toastService = inject(SbbToastService);

  openStackBlitz(): void {
    if (this._openStackBlitzFn) {
      this._openStackBlitzFn(this._variantSwitch.sbbVariant.value === 'lean');
    } else {
      this._toastService.open(StackBlitzMessage, {
        setupContainer: (sbbToast: SbbToast) => {
          sbbToast.readOnly = true;
          sbbToast.timeout = 2000;
        },
      });
    }
  }

  private _prepareStackBlitzForExample(data: ExampleData): void {
    this._ngZone.runOutsideAngular(async () => {
      this._openStackBlitzFn = await this._stackBlitzWriter.createStackBlitzForExample(data);
    });
  }
}
