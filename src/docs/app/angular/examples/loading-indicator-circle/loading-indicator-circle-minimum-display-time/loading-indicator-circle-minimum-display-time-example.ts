import { Component, signal } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbLoadingIndicatorCircleModule } from '@sbb-esta/lyne-angular/loading-indicator-circle';
import { delay, finalize, forkJoin, of, timer } from 'rxjs';

const MINIMUM_DISPLAY_TIME = 500;

/**
 * @title Loading indicator circle with minimum display time
 * @order 2
 */
@Component({
  selector: 'sbb-loading-indicator-circle-minimum-display-time-example',
  templateUrl: 'loading-indicator-circle-minimum-display-time-example.html',
  imports: [SbbLoadingIndicatorCircleModule, SbbButtonModule],
})
export class LoadingIndicatorCircleMinimumDisplayTimeExample {
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
