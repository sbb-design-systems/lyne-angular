import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbStatusElement, SbbStatusType } from '@sbb-esta/lyne-elements/status.js';
import '@sbb-esta/lyne-elements/status.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

@Directive({
  selector: 'sbb-status',
  exportAs: 'sbbStatus',
})
export class SbbStatus {
  #element: ElementRef<SbbStatusElement> = inject(ElementRef<SbbStatusElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set type(value: SbbStatusType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbStatusType {
    return this.#element.nativeElement.type;
  }

  @Input()
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

  @Input()
  public set titleLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleLevel = value));
  }
  public get titleLevel(): SbbTitleLevel {
    return this.#element.nativeElement.titleLevel;
  }

  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }
}
