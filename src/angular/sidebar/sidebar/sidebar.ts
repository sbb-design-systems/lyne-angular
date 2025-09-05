import { Directive, ElementRef, inject, Input, NgZone, type OnInit } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
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
  #disabledAnimationClassSet: boolean = false;

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

  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  public beforeCloseOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<Event>(NEVER, { alias: 'close' });
  public closeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  public constructor() {
    //  We have to access the sbb-sidebar-container because the animations are applied to it.
    //  As the animation state (whether it is open) is handled in this class, the logic must be added here.
    //  We cannot use 'this.container' getter in the constructor because the element has not yet been connected to the DOM.
    const container = this.#element.nativeElement.closest('sbb-sidebar-container');

    if (container && !container.classList.contains('sbb-disable-animation')) {
      container.classList.add('sbb-disable-animation');
      this.#disabledAnimationClassSet = true;
    }
  }

  public ngOnInit(): void {
    this.#element.nativeElement.updateComplete.then(() => {
      const container = this.container;

      if (container && this.#disabledAnimationClassSet) {
        container.classList.remove('sbb-disable-animation');
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
