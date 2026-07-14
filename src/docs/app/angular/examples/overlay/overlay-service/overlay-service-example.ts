import { Component, inject, signal } from '@angular/core';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SBB_OVERLAY_DATA } from '@sbb-esta/lyne-angular/core';
import { SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';
import { SbbOverlayRef, SbbOverlayService } from '@sbb-esta/lyne-angular/overlay';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-overlay-service-content-example',
  template: `
    <sbb-title>Confirmation</sbb-title>
    <p>Hello {{ overlayData.name }}, are you sure you want to proceed?</p>
    <sbb-action-group>
      <sbb-secondary-button sbb-overlay-close="cancel">Cancel</sbb-secondary-button>
      <sbb-button sbb-overlay-close="confirm" sbb-focus-initial>Confirm</sbb-button>
    </sbb-action-group>
  `,
  imports: [SbbActionGroupModule, SbbButtonModule, SbbDialogModule, SbbTitleModule],
})
export class OverlayServiceContentExample {
  // Fetch the overlay data using the injection token
  protected overlayData = inject<{ name: string }>(SBB_OVERLAY_DATA);
  #overlayRef = inject(SbbOverlayRef);

  protected anotherClose(): void {
    // You can use the injected `overlayRef` to close the dialog programmatically.
    this.#overlayRef.close('another-close-result');
  }
}

/**
 * @title Overlay opened via service
 * @order 2
 */
@Component({
  selector: 'sbb-overlay-service-example',
  templateUrl: 'overlay-service-example.html',
  imports: [SbbButtonModule, SbbCardModule],
})
export class OverlayServiceExample {
  protected lastResult = signal<string | null>(null);
  private _overlayService = inject(SbbOverlayService);

  protected openOverlay(): void {
    const overlayRef = this._overlayService.open<OverlayServiceContentExample, string>(
      OverlayServiceContentExample,
      { data: { name: 'Luigi' } },
    );

    // Listen to the 'afterClosed' event to get the result of the overlay.
    overlayRef.afterClosed.subscribe((event) => {
      this.lastResult.set(event.result ?? null);
    });
  }
}
