import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  ViewContainerRef,
  ChangeDetectorRef,
  contentChild,
  TemplateRef,
  type OutputRef,
  inject,
} from '@angular/core';
import { outputFromObservable, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import {
  SbbTabElement,
  type SbbTabGroupElement,
  type SbbTabLabelElement,
} from '@sbb-esta/lyne-elements/tabs.pure.js';
import { distinctUntilChanged, fromEvent, NEVER, switchMap } from 'rxjs';

import type { SbbTabContent } from './tab-content';
import { SBB_TAB_CONTENT } from './tab-content';

/**
 * Combined with a `sbb-tab-group` and `sbb-tab-label`, it displays a tab's content.
 *
 * @slot  - Use the unnamed slot to provide content.
 */
@Component({
  selector: 'sbb-tab',
  exportAs: 'sbbTab',
  imports: [CdkPortalOutlet],
  template: `
    <ng-template [cdkPortalOutlet]="contentPortal"></ng-template>
    <ng-content></ng-content>
  `,
})
export class SbbTab {
  static {
    SbbTabElement.define();
  }

  #element: ElementRef<SbbTabElement> = inject(ElementRef<SbbTabElement>);
  #viewContainerRef = inject(ViewContainerRef);
  #changeDetectorRef = inject(ChangeDetectorRef);

  protected contentPortal: TemplatePortal | null = null;

  private _explicitContent = contentChild<SbbTabContent, TemplateRef<unknown>>(SBB_TAB_CONTENT, {
    read: TemplateRef,
  });

  /**
   * The `sbb-tab-label` associated with the tab.
   */
  public get label(): SbbTabLabelElement | null {
    return this.#element.nativeElement.label;
  }

  protected _activeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, {
    alias: 'active',
  });
  /**
   * The `active` event fires when the sbb-tab has been activated via user selection on the sbb-tab-label.
   */
  public activeOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'active'),
  );

  constructor() {
    const contentChildObservable = toObservable(this._explicitContent);
    fromEvent<Event>(this.#element.nativeElement, 'active')
      .pipe(
        switchMap(() => contentChildObservable),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((templateRef) => {
        this.contentPortal = templateRef
          ? new TemplatePortal(templateRef, this.#viewContainerRef)
          : null;
        this.#changeDetectorRef.markForCheck();
      });
  }

  /**
   * Get the parent `sbb-tab-group`.
   */
  public get group(): SbbTabGroupElement | null {
    return this.#element.nativeElement.group;
  }
}
