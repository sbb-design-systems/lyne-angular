import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbCheckboxGroupElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-group.js';
import type { SbbCheckboxPanelElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-panel.js';
import type { SbbCheckboxElement } from '@sbb-esta/lyne-elements/checkbox/checkbox.js';
import type { SbbCheckboxSize } from '@sbb-esta/lyne-elements/checkbox.js';
import type { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';

import '@sbb-esta/lyne-elements/checkbox/checkbox-group.js';

@Directive({
  selector: 'sbb-checkbox-group',
  exportAs: 'sbbCheckboxGroup',
})
export class SbbCheckboxGroup {
  #element: ElementRef<SbbCheckboxGroupElement> = inject(ElementRef<SbbCheckboxGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set required(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.required = value));
  }
  public get required(): boolean {
    return this.#element.nativeElement.required;
  }

  @Input()
  public set size(value: SbbCheckboxSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbCheckboxSize {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set horizontalFrom(value: SbbHorizontalFrom | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom | null {
    return this.#element.nativeElement.horizontalFrom;
  }

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  public get checkboxes(): (SbbCheckboxElement | SbbCheckboxPanelElement)[] {
    return this.#element.nativeElement.checkboxes;
  }
}
