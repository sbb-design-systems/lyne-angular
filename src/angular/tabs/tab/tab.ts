import { Directive, ElementRef, inject } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';
import type { SbbTabElement } from '@sbb-esta/lyne-elements/tabs/tab.js';
import { NEVER, fromEvent } from 'rxjs';
import '@sbb-esta/lyne-elements/tabs/tab.js';

@Directive({
  selector: 'sbb-tab',
  exportAs: 'sbbTab',
})
export class SbbTab {
  #element: ElementRef<SbbTabElement> = inject(ElementRef<SbbTabElement>);

  public get label(): SbbTabLabelElement | null {
    return this.#element.nativeElement.label;
  }

  protected _activeOutput = outputFromObservable<Event>(NEVER, { alias: 'active' });
  public activeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'active'),
  );
}
