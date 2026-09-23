import { Component, signal } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbLoadingIndicatorModule } from '@sbb-esta/lyne-angular/loading-indicator';
import { delay, finalize, forkJoin, of, timer } from 'rxjs';

const MINIMUM_DISPLAY_TIME = 500;

/**
 * @title Loading indicator with minimum display time
 * @order 2
 */
@Component({
  selector: 'sbb-loading-indicator-minimum-display-time-example',
  templateUrl: 'loading-indicator-minimum-display-time-example.html',
  imports: [SbbLoadingIndicatorModule, SbbButtonModule],
})
export class LoadingIndicatorMinimumDisplayTimeExample {
  protected loading = signal(false);

  protected loadData(): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);

    // Simulates an api call with a random duration between 250ms and 1500ms.
    const apiCall$ = of(null).pipe(delay(250 + Math.random() * (1500 - 250)));

    forkJoin([apiCall$, timer(MINIMUM_DISPLAY_TIME)])
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe();
  }
}
