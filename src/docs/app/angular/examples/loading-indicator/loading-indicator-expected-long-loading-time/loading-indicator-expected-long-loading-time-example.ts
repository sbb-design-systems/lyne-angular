import { Component, signal } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbLoadingIndicatorModule } from '@sbb-esta/lyne-angular/loading-indicator';

/**
 * @title Loading indicator with long loading time expected
 * @order 4
 */
@Component({
  selector: 'sbb-loading-indicator-expected-long-loading-time-example',
  templateUrl: 'loading-indicator-expected-long-loading-time-example.html',
  imports: [SbbLoadingIndicatorModule, SbbButtonModule],
})
export class LoadingIndicatorExpectedLongLoadingTimeExample {
  protected loading = signal(false);
  protected dataAvailable = signal(false);

  protected loadData(): void {
    if (this.loading()) {
      return;
    }
    this.loading.set(true);
    this.dataAvailable.set(false);

    setTimeout(() => {
      this.loading.set(false);
      this.dataAvailable.set(true);
    }, 2000);
  }
}
