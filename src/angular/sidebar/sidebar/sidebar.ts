import { Directive, ElementRef, inject, Input, NgZone, type OnInit } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/sidebar-container.js';
import type { SbbSidebarElement } from '@sbb-esta/lyne-elements/sidebar/sidebar.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/sidebar/sidebar.js';

@Directive({
  selector: 'sbb-sidebar',
  exportAs: 'sbbSidebar',
})
export class SbbSidebar implements OnInit {
  #element: ElementRef<SbbSidebarElement> = inject(ElementRef<SbbSidebarElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  @Input()
  public set mode(value: 'side' | 'over') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.mode = value));
  }
  public get mode(): 'side' | 'over' {
    return this.#element.nativeElement.mode;
  }

  @Input()
  public set position(value: 'start' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.position = value));
  }
  public get position(): 'start' | 'end' {
    return this.#element.nativeElement.position;
  }

  @Input({ transform: booleanAttribute })
  public set opened(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.opened = value));
  }
  public get opened(): boolean {
    return this.#element.nativeElement.opened;
  }

  @Input({ transform: booleanAttribute })
  public set focusOnOpen(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focusOnOpen = value));
  }
  public get focusOnOpen(): boolean {
    return this.#element.nativeElement.focusOnOpen;
  }

  @Input({ transform: booleanAttribute })
  public set isAnimating(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.isAnimating = value));
  }
  public get isAnimating(): boolean {
    return this.#element.nativeElement.isAnimating;
  }

  public get container(): SbbSidebarContainerElement | null {
    return this.#element.nativeElement.container;
  }

  public get animationComplete(): Promise<void> | null {
    return this.#element.nativeElement.animationComplete;
  }

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public beforeOpenSignal = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openSignal = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'open'));

  public beforeCloseSignal = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeSignal = outputFromObservable<Event>(NEVER, { alias: 'close' });
  public closeSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'close'));

  public constructor() {
    // We can't use `this.container` in the constructor, because the element is not yet connected to the DOM.
    const container = this.#element.nativeElement.closest('sbb-sidebar-container');

    if (container && !container.classList.contains('sbb-disable-animation')) {
      container.classList.add('sbb-disable-animation', 'sbb-deferred-animation-init');
    }
  }

  public ngOnInit(): void {
    this.#element.nativeElement.updateComplete.then(() => {
      const container = this.container;

      if (container?.classList.contains('sbb-deferred-animation-init')) {
        container.classList.remove('sbb-disable-animation', 'sbb-deferred-animation-init');
      }
    });
  }

  public toggle(): void {
    return this.#element.nativeElement.toggle();
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }
}
