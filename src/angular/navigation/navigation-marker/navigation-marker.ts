import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { SbbNavigationButtonElement } from '@sbb-esta/lyne-elements/navigation/navigation-button.js';
import { SbbNavigationLinkElement } from '@sbb-esta/lyne-elements/navigation/navigation-link.js';
import type { SbbNavigationMarkerElement } from '@sbb-esta/lyne-elements/navigation/navigation-marker.js';
import '@sbb-esta/lyne-elements/navigation/navigation-marker.js';

@Directive({
  selector: 'sbb-navigation-marker',
  standalone: true,
})
export class SbbNavigationMarker {
  #element: ElementRef<SbbNavigationMarkerElement> = inject(ElementRef<SbbNavigationMarkerElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: 'l' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'l' | 's' {
    return this.#element.nativeElement.size;
  }

  public select(action: SbbNavigationButtonElement | SbbNavigationLinkElement): void {
    return this.#element.nativeElement.select(action);
  }

  public reset(): void {
    return this.#element.nativeElement.reset();
  }
}
