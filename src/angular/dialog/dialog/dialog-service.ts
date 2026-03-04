import type { ComponentType } from '@angular/cdk/overlay';
import { type TemplateRef, inject, Injectable } from '@angular/core';
import { type SbbOverlayConfig, SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core/overlay';

import type { SbbDialog } from './dialog';
import { SbbDialogContainer } from './dialog-container';
import { SbbDialogRef } from './dialog-ref';

@Injectable({ providedIn: 'root' })
export class SbbDialogService extends SbbOverlayBaseService<
  SbbDialogContainer,
  SbbDialog,
  SbbDialogRef
> {
  protected parentService = inject(SbbDialogService, { optional: true, skipSelf: true });
  protected containerType = SbbDialogContainer;
  protected overlayRefConstructor = SbbDialogRef;

  // TODO(breaking-change): The default type for R should be `unknown`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override open<T = unknown, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: SbbOverlayConfig<SbbDialogContainer, SbbDialog>,
  ): SbbDialogRef<T, R> {
    return super.open(componentOrTemplateRef, config) as SbbDialogRef<T, R>;
  }
}
