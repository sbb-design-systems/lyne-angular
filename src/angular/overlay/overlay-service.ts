import type { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable, type TemplateRef } from '@angular/core';
import { SbbOverlayBaseService, type SbbOverlayConfig } from '@sbb-esta/lyne-angular/core/overlay';

import type { SbbOverlay } from './overlay';
import { SbbOverlayContainer } from './overlay-container';
import { SbbOverlayRef } from './overlay-ref';

@Injectable({ providedIn: 'root' })
export class SbbOverlayService extends SbbOverlayBaseService<
  SbbOverlayContainer,
  SbbOverlay,
  SbbOverlayRef
> {
  protected parentService = inject(SbbOverlayService, { optional: true, skipSelf: true });
  protected containerType = SbbOverlayContainer;
  protected overlayRefConstructor = SbbOverlayRef;

  // TODO(breaking-change): The default type for R should be `unknown`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override open<T = unknown, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: SbbOverlayConfig<SbbOverlayContainer, SbbOverlay>,
  ): SbbOverlayRef<T, R> {
    return super.open(componentOrTemplateRef, config) as SbbOverlayRef<T, R>;
  }
}
