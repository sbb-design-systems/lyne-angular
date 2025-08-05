import { Directive, ElementRef, inject, Input, NgZone, type OnInit } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbExpansionPanelElement } from '@sbb-esta/lyne-elements/expansion-panel/expansion-panel.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/expansion-panel/expansion-panel.js';

@Directive({
  selector: 'sbb-expansion-panel',
  exportAs: 'sbbExpansionPanel',
})
export class SbbExpansionPanel implements OnInit {
  #element: ElementRef<SbbExpansionPanelElement> = inject(ElementRef<SbbExpansionPanelElement>);
  #ngZone: NgZone = inject(NgZone);

  constructor() {
    // Ensure that the animation is disabled on initialization. OnInit it can be activated again.
    if (!this.#element.nativeElement.classList.contains('sbb-disable-animation')) {
      this.#element.nativeElement.classList.add(
        'sbb-disable-animation',
        'sbb-expansion-panel-init',
      );
    }
  }

  @Input()
  public set titleLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.titleLevel;
  }

  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  @Input()
  public set size(value: 's' | 'l') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'l' {
    return this.#element.nativeElement.size;
  }

  public beforeOpenSignal = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  public beforeCloseSignal = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _openSignal = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'open'));

  protected _closeSignal = outputFromObservable<Event>(NEVER, { alias: 'close' });
  public closeSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'close'));

  public ngOnInit(): void {
    if (this.#element.nativeElement.classList.contains('sbb-expansion-panel-init')) {
      this.#element.nativeElement.classList.remove(
        'sbb-disable-animation',
        'sbb-expansion-panel-init',
      );
    }
  }
}
