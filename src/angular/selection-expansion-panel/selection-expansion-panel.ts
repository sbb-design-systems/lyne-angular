import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSelectionExpansionPanelElement } from '@sbb-esta/lyne-elements/selection-expansion-panel.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';
import '@sbb-esta/lyne-elements/selection-expansion-panel.js';

@Directive({
  selector: 'sbb-selection-expansion-panel',
})
export class SbbSelectionExpansionPanel {
  #element: ElementRef<SbbSelectionExpansionPanelElement> = inject(
    ElementRef<SbbSelectionExpansionPanelElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  @Input({ transform: booleanAttribute })
  public set forceOpen(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.forceOpen = value));
  }
  public get forceOpen(): boolean {
    return this.#element.nativeElement.forceOpen;
  }

  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  @Output('willOpen') protected _willOpen: (typeof this)['willOpen'] = NEVER;
  public willOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willOpen');

  @Output('didOpen') protected _didOpen: (typeof this)['didOpen'] = NEVER;
  public didOpen: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didOpen');

  @Output('willClose') protected _willClose: (typeof this)['willClose'] = NEVER;
  public willClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'willClose');

  @Output('didClose') protected _didClose: (typeof this)['didClose'] = NEVER;
  public didClose: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didClose');
}
