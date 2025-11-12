import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import {
  booleanAttribute,
  internalOutputFromObservable,
  SbbDeferredAnimation,
} from '@sbb-esta/lyne-angular/core';
import type { SbbSelectionExpansionPanelElement } from '@sbb-esta/lyne-elements/selection-expansion-panel.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/selection-expansion-panel.js';

/**
 * It displays an expandable panel connected to a `sbb-checkbox` or to a `sbb-radio-button`.
 *
 * @slot  - Use the unnamed slot to add `sbb-checkbox` or `sbb-radio-button` elements to the `sbb-selection-expansion-panel`.
 * @slot content - Use this slot to provide custom content for the panel (optional).
 */
@Directive({
  selector: 'sbb-selection-expansion-panel',
  exportAs: 'sbbSelectionExpansionPanel',
  hostDirectives: [SbbDeferredAnimation],
})
export class SbbSelectionExpansionPanel {
  #element: ElementRef<SbbSelectionExpansionPanelElement> = inject(
    ElementRef<SbbSelectionExpansionPanelElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * The background color of the panel.
   */
  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  /**
   * Whether the content section is always visible.
   */
  @Input({ transform: booleanAttribute })
  public set forceOpen(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.forceOpen = value));
  }
  public get forceOpen(): boolean {
    return this.#element.nativeElement.forceOpen;
  }

  /**
   * Whether the unselected panel has a border.
   */
  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  /**
   * Emits whenever the content section starts the opening transition.
   */
  public beforeOpenOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  /**
   * Emits whenever the content section begins the closing transition.
   */
  public beforeCloseOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits whenever the content section is closed.
   */
  public closeOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  protected _openOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the content section is opened.
   */
  public openOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );
}
