/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbActionGroupElement } from '@sbb-esta/lyne-elements/action-group.js';
import '@sbb-esta/lyne-elements/action-group.js';
import { SbbButtonSize } from '@sbb-esta/lyne-elements/button.js';
import { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import { SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';

@Directive({
  selector: 'sbb-action-group',
  standalone: true,
})
export class SbbActionGroupDirective {
  #element: ElementRef<SbbActionGroupElement> = inject(ElementRef<SbbActionGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'align-group' })
  public set alignGroup(value: 'start' | 'center' | 'stretch' | 'end') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignGroup = value));
  }
  public get alignGroup(): 'start' | 'center' | 'stretch' | 'end' {
    return this.#element.nativeElement.alignGroup;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'horizontal-from' })
  public set horizontalFrom(value: SbbHorizontalFrom) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom {
    return this.#element.nativeElement.horizontalFrom;
  }

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'button-size' })
  public set buttonSize(value: SbbButtonSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.buttonSize = value));
  }
  public get buttonSize(): SbbButtonSize {
    return this.#element.nativeElement.buttonSize;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'link-size' })
  public set linkSize(value: SbbLinkSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.linkSize = value));
  }
  public get linkSize(): SbbLinkSize {
    return this.#element.nativeElement.linkSize;
  }
}
