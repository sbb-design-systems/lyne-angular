import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTabGroupElement } from '@sbb-esta/lyne-elements/tabs/tab-group.js';
import type { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';
import type { SbbTabElement } from '@sbb-esta/lyne-elements/tabs/tab.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/tabs/tab-label.js';

/**
 * Combined with a `sbb-tab-group`, it displays a tab's title.
 *
 * @slot  - Use the unnamed slot to add content to the tab title.
 * @slot icon - Use this slot to display an icon to the left of the title, by providing the `sbb-icon` component.
 * @slot amount - Provide a number to show an amount to the right of the title.
 */
@Directive({
  selector: 'sbb-tab-label',
  exportAs: 'sbbTabLabel',
})
export class SbbTabLabel {
  #element: ElementRef<SbbTabLabelElement> = inject(ElementRef<SbbTabLabelElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The level will correspond to the heading tag generated in the title.
   * Use this property to generate the appropriate header tag, taking SEO into consideration.
   */
  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  /**
   * Active tab state.
   */
  @Input({ transform: booleanAttribute })
  public set active(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.active = value));
  }
  public get active(): boolean {
    return this.#element.nativeElement.active;
  }

  /**
   * Amount displayed inside the tab.
   */
  @Input()
  public set amount(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.amount = value));
  }
  public get amount(): string {
    return this.#element.nativeElement.amount;
  }

  /**
   * Whether the component is disabled.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  /**
   * Get the `sbb-tab` related to the `sbb-tab-label`.
   */
  public get tab(): SbbTabElement | null {
    return this.#element.nativeElement.tab;
  }

  /**
   * Get the parent `sbb-tab-group`.
   */
  public get group(): SbbTabGroupElement | null {
    return this.#element.nativeElement.group;
  }

  /**
   * Deactivate the tab.
   */
  public deactivate(): void {
    return this.#element.nativeElement.deactivate();
  }

  /**
   * Select the tab, deactivating the current selected one, and dispatch the tabchange event.
   */
  public activate(): void {
    return this.#element.nativeElement.activate();
  }
}
