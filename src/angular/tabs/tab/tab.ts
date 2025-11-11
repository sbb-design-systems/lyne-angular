import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  ContentChild,
  ElementRef,
  inject,
  type OutputRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbTabLabelElement } from '@sbb-esta/lyne-elements/tabs/tab-label.js';
import type { SbbTabElement } from '@sbb-esta/lyne-elements/tabs/tab.js';
import { NEVER, fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/tabs/tab.js';
import { SBB_TAB_CONTENT } from './tab-content';

@Component({
  selector: 'sbb-tab',
  exportAs: 'sbbTab',
  imports: [CdkPortalOutlet],
  template: `
    <ng-template [cdkPortalOutlet]="contentPortal"></ng-template>
    <ng-template #implicitContent>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class SbbTab {
  #element: ElementRef<SbbTabElement> = inject(ElementRef<SbbTabElement>);
  #viewContainerRef = inject(ViewContainerRef);
  public contentPortal: TemplatePortal | null = null;

  @ContentChild(SBB_TAB_CONTENT, { read: TemplateRef, static: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _explicitContent?: TemplateRef<any>;

  @ViewChild('implicitContent', { read: TemplateRef, static: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _implicitContent?: TemplateRef<any>;

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
    this.activeOutput.subscribe(() => {
      this.contentPortal = new TemplatePortal(
        (this._explicitContent || this._implicitContent)!,
        this.#viewContainerRef,
      );
    });
  }
}
