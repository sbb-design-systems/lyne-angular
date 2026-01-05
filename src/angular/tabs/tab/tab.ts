import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import type { InjectionToken, OutputRef } from '@angular/core';
import {
  ChangeDetectorRef,
  Component,
  contentChild,
  ElementRef,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { outputFromObservable, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';
import type { SbbTabElement } from '@sbb-esta/lyne-elements/tabs/tab.js';
import { distinctUntilChanged, fromEvent, NEVER, switchMap } from 'rxjs';

import type { SbbTabContent } from './tab-content';
import { SBB_TAB_CONTENT } from './tab-content';

import '@sbb-esta/lyne-elements/tabs/tab.js';

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
  #element: ElementRef<SbbTabElement> = inject(ElementRef<SbbTabElement>);
  #viewContainerRef = inject(ViewContainerRef);
  #changeDetectorRef = inject(ChangeDetectorRef);

  // TODO(breaking-change): make protected instead of public
  public contentPortal: TemplatePortal | null = null;

  private _explicitContent = contentChild<InjectionToken<SbbTabContent>, TemplateRef<unknown>>(
    SBB_TAB_CONTENT,
    {
      read: TemplateRef,
    },
  );

  public get label(): SbbTabLabelElement | null {
    return this.#element.nativeElement.label;
  }

  protected _activeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, {
    alias: 'active',
  });
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
}
