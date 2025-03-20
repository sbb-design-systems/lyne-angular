import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSidebarTitleElement } from '@sbb-esta/lyne-elements/sidebar/sidebar-title.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/sidebar/sidebar-title.js';

@Directive({
  selector: 'sbb-sidebar-title',
})
export class SbbSidebarTitle {
  #element: ElementRef<SbbSidebarTitleElement> = inject(ElementRef<SbbSidebarTitleElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  @Input({ alias: 'visual-level' })
  public set visualLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visualLevel = value));
  }
  public get visualLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.visualLevel;
  }

  @Input({ alias: 'visually-hidden', transform: booleanAttribute })
  public set visuallyHidden(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visuallyHidden = value));
  }
  public get visuallyHidden(): boolean {
    return this.#element.nativeElement.visuallyHidden;
  }
}
