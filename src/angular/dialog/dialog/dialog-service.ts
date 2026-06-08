import type { ComponentType } from '@angular/cdk/overlay';
import { inject, Service, type TemplateRef } from '@angular/core';
import { SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core/overlay';

import type { SbbDialog } from './dialog';
import type { SbbDialogConfig } from './dialog-config';
import { SbbDialogContainer } from './dialog-container';
import { SbbDialogRef } from './dialog-ref';

@Service()
export class SbbDialogService extends SbbOverlayBaseService<
  SbbDialogContainer,
  SbbDialog,
  SbbDialogRef
> {
  protected parentService = inject(SbbDialogService, { optional: true, skipSelf: true });
  protected containerType = SbbDialogContainer;
  protected overlayRefConstructor = SbbDialogRef;

  public override open<T = unknown, R = unknown>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: SbbDialogConfig<SbbDialogContainer>,
  ): SbbDialogRef<T, R> {
    return super.open(componentOrTemplateRef, config) as SbbDialogRef<T, R>;
  }
}
