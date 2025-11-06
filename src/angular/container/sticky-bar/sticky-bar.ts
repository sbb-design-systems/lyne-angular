import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbStickyBarElement } from '@sbb-esta/lyne-elements/container/sticky-bar.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/container/sticky-bar.js';

/**
 * A container that sticks to the bottom of the page if slotted into `sbb-container`.
 *
 * @slot  - Use the unnamed slot to add content to the sticky bar.
 * @cssprop [--sbb-sticky-bar-padding-block=var(--sbb-spacing-responsive-xs)] - Block padding of the sticky bar.
 * @cssprop [--sbb-sticky-bar-bottom-overlapping-height=0px] - Define an additional area where the sticky bar overlaps the following content on the bottom. This area becomes visible when the sticky bar transitions from sticky to the normal document flow.
 * @cssprop [--sbb-sticky-bar-z-index=undefined] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable.
 */
@Directive({
  selector: 'sbb-sticky-bar',
  exportAs: 'sbbStickyBar',
})
export class SbbStickyBar {
  #element: ElementRef<SbbStickyBarElement> = inject(ElementRef<SbbStickyBarElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Color of the container, like transparent, white etc.
   */
  @Input()
  public set color(value: 'white' | 'milk' | 'midnight' | 'charcoal' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' | 'midnight' | 'charcoal' | null {
    return this.#element.nativeElement.color;
  }

  /**
   * Size of the container.
   */
  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  /**
   * Animates from normal content flow position to `position: sticky`.
   */
  public stick(): void {
    return this.#element.nativeElement.stick();
  }

  /**
   * Animates `position: sticky` to normal content flow position.
   */
  public unstick(): void {
    return this.#element.nativeElement.unstick();
  }

  protected _stickOutput = outputFromObservable<Event>(NEVER, { alias: 'stick' });
  /**
   * Emits when the animation from normal content flow to `position: sticky` ends.
   */
  public stickOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'stick'),
  );

  protected _unstickOutput = outputFromObservable<Event>(NEVER, { alias: 'unstick' });
  /**
   * Emits when the animation from `position: sticky` to normal content flow ends.
   */
  public unstickOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'unstick'),
  );

  /**
   * Emits when the animation from normal content flow to `position: sticky` starts. Can be canceled.
   */
  public beforeStickOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforestick'),
    { alias: 'beforeStick' },
  );

  /**
   * Emits when the animation from `position: sticky` to normal content flow starts. Can be canceled.
   */
  public beforeUnstickOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeunstick'),
    { alias: 'beforeUnstick' },
  );
}
