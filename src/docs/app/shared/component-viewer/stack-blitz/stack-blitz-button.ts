import { inject, NgZone, Directive, Input } from '@angular/core';

import { VariantSwitch } from '../../../variant-switch';
import type { ExampleData } from '../../example-data';

import { StackBlitzWriter } from './stack-blitz-writer';

@Directive({
  selector: 'sbb-secondary-button[sbb-stack-blitz-button]',
  host: {
    '(click)': 'openStackBlitz()',
  },
})
export class StackBlitzButton {
  /**
   * Function that can be invoked to open the StackBlitz window synchronously.
   *
   * **Note**: All files for the StackBlitz need to be loaded and prepared ahead-of-time,
   * because doing so on-demand will cause Firefox to block the submit as a popup as the
   * form submission (used internally to create the StackBlitz) didn't happen within the
   * same tick as the user interaction.
   */
  private _openStackBlitzFn: ((isSbbLean: boolean) => void) | null = null;

  @Input()
  set exampleData(exampleData: ExampleData) {
    if (exampleData) {
      this._prepareStackBlitzForExample(exampleData);
    } else {
      this._openStackBlitzFn = null;
    }
  }

  private _stackBlitzWriter: StackBlitzWriter = inject(StackBlitzWriter);
  private _ngZone: NgZone = inject(NgZone);
  private _variantSwitch = inject(VariantSwitch);

  openStackBlitz(): void {
    if (this._openStackBlitzFn) {
      this._openStackBlitzFn(this._variantSwitch.sbbVariant.value === 'lean');
    } else {
      // FIXME ?
      console.log('StackBlitz is not ready yet. Please try again in a few seconds.');
    }
  }

  private _prepareStackBlitzForExample(data: ExampleData): void {
    this._ngZone.runOutsideAngular(async () => {
      this._openStackBlitzFn = await this._stackBlitzWriter.createStackBlitzForExample(data);
    });
  }
}
