import { Directive, ElementRef, inject, Input, NgZone, type OnInit } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbSidebarContainerElement } from '@sbb-esta/lyne-elements/sidebar/sidebar-container.js';
import type { SbbSidebarElement } from '@sbb-esta/lyne-elements/sidebar/sidebar.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/sidebar/sidebar.js';

/**
 * This component corresponds to a sidebar that can be opened on the sidebar container.
 *
 * @slot  - Use the unnamed slot to slot any content into the sidebar.
 * @slot title - Use the title slot to add an <sbb-title>.
 */
@Directive({
  selector: 'sbb-sidebar',
  exportAs: 'sbbSidebar',
})
export class SbbSidebar implements OnInit {
  #element: ElementRef<SbbSidebarElement> = inject(ElementRef<SbbSidebarElement>);
  #ngZone: NgZone = inject(NgZone);
  #disabledAnimationClassSet: boolean = false;

  /**
   * Background color of the sidebar. Either `white` or `milk`.
   */
  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  /**
   * Mode of the sidebar; one of 'side' or 'over'.
   */
  @Input()
  public set mode(value: 'side' | 'over') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.mode = value));
  }
  public get mode(): 'side' | 'over' {
    return this.#element.nativeElement.mode;
  }

  /**
   * The side that the sidebar is attached to.
   */
  @Input()
  public set position(value: 'start' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.position = value));
  }
  public get position(): 'start' | 'end' {
    return this.#element.nativeElement.position;
  }

  /**
   * Whether the sidebar is opened or closed.
   * Can be used to initially set the opened state, where
   * the animation will be skipped.
   */
  @Input({ transform: booleanAttribute })
  public set opened(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.opened = value));
  }
  public get opened(): boolean {
    return this.#element.nativeElement.opened;
  }

  /**
   * Whether the sidebar should focus the first focusable element automatically when opened.
   * Defaults to false in when mode is set to `side`, otherwise defaults to true.
   * If explicitly enabled, focus will be moved into the sidebar in `side` mode as well.
   */
  @Input({ transform: booleanAttribute })
  public set focusOnOpen(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focusOnOpen = value));
  }
  public get focusOnOpen(): boolean {
    return this.#element.nativeElement.focusOnOpen;
  }

  /**
   * Whether the component is currently animating.
   */
  @Input({ transform: booleanAttribute })
  public set isAnimating(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.isAnimating = value));
  }
  public get isAnimating(): boolean {
    return this.#element.nativeElement.isAnimating;
  }

  /**
   * Returns the SbbSidebarContainerElement where this sidebar is contained.
   */
  public get container(): SbbSidebarContainerElement | null {
    return this.#element.nativeElement.container;
  }

  /**
   * Returns a promise which completes whenever an animation ends.
   * When a new animation starts, a new Promise is returned.
   */
  public get animationComplete(): Promise<void> | null {
    return this.#element.nativeElement.animationComplete;
  }

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Emits whenever the component starts the opening transition. Can be canceled.
   */
  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the component is opened.
   */
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits whenever the component is closed.
   */
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

  /**
   * Toggles the sidebar visibility.
   */
  public toggle(): void {
    return this.#element.nativeElement.toggle();
  }

  /**
   * Opens the sidebar.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Closes the sidebar.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
