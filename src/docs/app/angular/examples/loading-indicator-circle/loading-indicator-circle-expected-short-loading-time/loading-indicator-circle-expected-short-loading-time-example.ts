import { Component, signal } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbLoadingIndicatorCircleModule } from '@sbb-esta/lyne-angular/loading-indicator-circle';

/**
 * @title Loading indicator circle with short loading time expected
 * @order 3
 */
@Component({
  selector: 'sbb-loading-indicator-circle-expected-short-loading-time-example',
  templateUrl: 'loading-indicator-circle-expected-short-loading-time-example.html',
  imports: [SbbLoadingIndicatorCircleModule, SbbButtonModule],
})
export class LoadingIndicatorCircleExpectedShortLoadingTimeExample {
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
