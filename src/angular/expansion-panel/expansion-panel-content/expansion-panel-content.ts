import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import type { InjectionToken } from '@angular/core';
import {
  ChangeDetectorRef,
  Component,
  contentChild,
  ElementRef,
  forwardRef,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import type { SbbExpansionPanelElement } from '@sbb-esta/lyne-elements/expansion-panel/expansion-panel.js';
import { distinctUntilChanged, fromEvent, switchMap } from 'rxjs';

import type { SbbExpansionPanelContentDirective } from './expansion-panel-content-directive';
import { SBB_EXPANSION_PANEL_CONTENT } from './expansion-panel-content-directive';

import '@sbb-esta/lyne-elements/expansion-panel/expansion-panel-content.js';

/**
 * It can be used as a container for the content of the `sbb-expansion-panel` component.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-expansion-panel`.
 */
@Component({
  selector: 'sbb-expansion-panel-content',
  exportAs: 'sbbExpansionPanelContent',
  imports: [CdkPortalOutlet],
  template: `
    <ng-template [cdkPortalOutlet]="contentPortal"></ng-template>
    <ng-content></ng-content>
  `,
})
export class SbbExpansionPanelContent {
  #viewContainerRef = inject(ViewContainerRef);
  #changeDetectorRef = inject(ChangeDetectorRef);
  #expansionPanel = inject<ElementRef<SbbExpansionPanelElement>>(
    forwardRef(() => ElementRef<SbbExpansionPanelElement>),
    { optional: true, skipSelf: true },
  );

  protected contentPortal: TemplatePortal | null = null;

  private _explicitContent = contentChild<
    InjectionToken<SbbExpansionPanelContentDirective>,
    TemplateRef<unknown>
  >(SBB_EXPANSION_PANEL_CONTENT, {
    read: TemplateRef,
  });

  constructor() {
    const contentChildObservable = toObservable(this._explicitContent);

    const parentElement = this.#expansionPanel?.nativeElement;
    if (parentElement && parentElement.localName === 'sbb-expansion-panel') {
      fromEvent<Event>(parentElement, 'beforeopen')
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
    } else {
      // Fallback: load immediately if not inside an expansion panel
      contentChildObservable
        .pipe(distinctUntilChanged(), takeUntilDestroyed())
        .subscribe((templateRef) => {
          this.contentPortal = templateRef
            ? new TemplatePortal(templateRef, this.#viewContainerRef)
            : null;
          this.#changeDetectorRef.markForCheck();
        });
    }
  }
}
