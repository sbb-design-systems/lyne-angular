import type { OutputRef, OutputRefSubscription } from '@angular/core';
import { assertInInjectionContext, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { Observable } from 'rxjs';

/**
 * Implementation of `OutputRef` that emits values from
 * an RxJS observable source.
 *
 * Copied from @angular/core/rxjs-interop.
 *
 * @internal
 */
class SbbInternalOutputFromObservableRef<T> implements OutputRef<T> {
  private destroyed = false;

  destroyRef = inject(DestroyRef);

  constructor(private source: Observable<T>) {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
    });
  }

  subscribe(callbackFn: (value: T) => void): OutputRefSubscription {
    if (this.destroyed && ngDevMode) {
      throw new Error(
        'Unexpected subscription to destroyed `OutputRef`. ' +
          'The owning directive/component is destroyed.',
      );
    }

    // Stop yielding more values when the directive/component is already destroyed.
    const subscription = this.source.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => callbackFn(value),
    });

    return {
      unsubscribe: () => subscription.unsubscribe(),
    };
  }
}

/**
 * Internal function to create an `OutputRef` from an RxJS `Observable`.
 * This is to mimic the same API as `outputFromObservable` from `@angular/core/rxjs-interop`
 * but hidden for language services because we use it in cases where have a hidden copy of an output.
 *
 * @internal
 */
export function internalOutputFromObservable<T>(observable: Observable<T>): OutputRef<T> {
  if (ngDevMode) {
    assertInInjectionContext(internalOutputFromObservable);
  }
  return new SbbInternalOutputFromObservableRef<T>(observable);
}
