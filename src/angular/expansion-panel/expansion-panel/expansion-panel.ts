import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import {
  booleanAttribute,
  internalOutputFromObservable,
  SbbDeferredAnimation,
} from '@sbb-esta/lyne-angular/core';
import type { SbbExpansionPanelElement } from '@sbb-esta/lyne-elements/expansion-panel/expansion-panel.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/expansion-panel/expansion-panel.js';

/**
 * It displays an expandable summary-details widget.
 *
 * @slot  - Use the unnamed slot to add a `sbb-expansion-panel-header` and a `sbb-expansion-panel-content` element.
 */
@Directive({
  selector: 'sbb-expansion-panel',
  exportAs: 'sbbExpansionPanel',
  hostDirectives: [SbbDeferredAnimation],
})
export class SbbExpansionPanel {
  #element: ElementRef<SbbExpansionPanelElement> = inject(ElementRef<SbbExpansionPanelElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Heading level; if unset, a `div` will be rendered.
   */
  @Input()
  public set titleLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.titleLevel;
  }

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
   * Whether the panel is expanded.
   */
  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  /**
   * Whether the panel is disabled, so its expanded state can't be changed.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  /**
   * Whether the panel has no border.
   */
  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  /**
   * Size variant, either l or s.
   */
  @Input()
  public set size(value: 's' | 'l') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' {
    return this.#element.nativeElement.size;
  }

  /**
   * Emits whenever the `sbb-expansion-panel` starts the opening transition.
   */
  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  /**
   * Emits whenever the `sbb-expansion-panel` begins the closing transition.
   */
  public beforeCloseOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the `sbb-expansion-panel` is opened.
   */
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  protected _closeOutput = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits whenever the `sbb-expansion-panel` is closed.
   */
  public closeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );
}
