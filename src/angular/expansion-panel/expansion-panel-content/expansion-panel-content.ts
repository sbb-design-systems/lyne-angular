import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import type { InjectionToken } from '@angular/core';
import {
  ChangeDetectorRef,
  Component,
  contentChild,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, switchMap } from 'rxjs';

import { SbbExpansionPanel } from '../expansion-panel/expansion-panel';

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
  #expansionPanel = inject<SbbExpansionPanel>(SbbExpansionPanel, {
    optional: true,
  });

  protected contentPortal: TemplatePortal | null = null;

  private _explicitContent = contentChild<
    InjectionToken<SbbExpansionPanelContentDirective>,
    TemplateRef<unknown>
  >(SBB_EXPANSION_PANEL_CONTENT, {
    read: TemplateRef,
  });

  constructor() {
    const contentChildObservable = toObservable(this._explicitContent);
    const outputRef = this.#expansionPanel?.beforeOpenOutput;

    (outputRef
      ? outputToObservable(outputRef).pipe(switchMap(() => contentChildObservable))
      : contentChildObservable
    )
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((ref) => {
        this.contentPortal = ref ? new TemplatePortal(ref, this.#viewContainerRef) : null;
        this.#changeDetectorRef.markForCheck();
      });
  }
}
