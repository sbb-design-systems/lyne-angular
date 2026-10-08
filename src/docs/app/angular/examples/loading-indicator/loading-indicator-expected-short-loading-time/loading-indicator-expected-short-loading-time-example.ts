import { Component, signal } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbLoadingIndicatorModule } from '@sbb-esta/lyne-angular/loading-indicator';

/**
 * @title Loading indicator with short loading time expected
 * @order 3
 */
@Component({
  selector: 'sbb-loading-indicator-expected-short-loading-time-example',
  templateUrl: 'loading-indicator-expected-short-loading-time-example.html',
  imports: [SbbLoadingIndicatorModule, SbbButtonModule],
})
export class LoadingIndicatorExpectedShortLoadingTimeExample {
  protected loading = signal(false);
  protected dataAvailable = signal(false);

  protected loadData(): void {
    if (this.loading()) {
      return;
    }

    setTimeout(() => {
      this.loading.set(true);
      this.dataAvailable.set(false);
    }, 1000);

    setTimeout(() => {
      this.loading.set(false);
      this.dataAvailable.set(true);
    }, 2000);
  }
}
