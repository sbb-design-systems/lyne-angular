import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/sidebar-container.js';
import type { SbbSidebarElement } from '@sbb-esta/lyne-elements/sidebar/sidebar.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/sidebar/sidebar.js';

@Directive({
  selector: 'sbb-sidebar',
})
export class SbbSidebar {
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

  @Input({ alias: 'focus-on-open', transform: booleanAttribute })
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

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('willOpen') protected _willOpen: (typeof this)['willOpen'] = NEVER;
  public willOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willOpen');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didOpen') protected _didOpen: (typeof this)['didOpen'] = NEVER;
  public didOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didOpen');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('willClose') protected _willClose: (typeof this)['willClose'] = NEVER;
  public willClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willClose');

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didClose') protected _didClose: (typeof this)['didClose'] = NEVER;
  public didClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didClose');

  public get container(): SbbSidebarContainerElement | null {
    return this.#element.nativeElement.container;
  }

  public get animationComplete(): Promise<void> | null {
    return this.#element.nativeElement.animationComplete;
  }

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
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
