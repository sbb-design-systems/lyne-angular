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

  public override open<T = unknown>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: SbbOverlayConfig<SbbDialogContainer, SbbDialog>,
  ): SbbDialogRef<T> {
    return super.open(componentOrTemplateRef, config) as SbbDialogRef<T>;
  }
}
