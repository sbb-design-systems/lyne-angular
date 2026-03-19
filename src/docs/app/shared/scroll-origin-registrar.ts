import { Directive, ElementRef, inject } from '@angular/core';
import type { OnDestroy, OnInit } from '@angular/core';

import { ScrollOrigin } from './scroll-origin';

/**
 * Directive that co-applies on `sbb-icon-sidebar-content` and
 * `sbb-sidebar-content` to register the host element as the current scroll origin.
 * Because Angular initializes child components after parents, the deepest nested
 * element always wins.
 */
@Directive({
  selector: 'sbb-icon-sidebar-content, sbb-sidebar-content',
})
export class ScrollOriginRegistrar implements OnInit, OnDestroy {
  #elementRef = inject(ElementRef<HTMLElement>);
  #service = inject(ScrollOrigin);

  ngOnInit(): void {
    this.#service.register(this.#elementRef);
  }

  ngOnDestroy(): void {
    this.#service.unregister(this.#elementRef);
  }
}
