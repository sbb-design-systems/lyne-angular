import type { ComponentType } from '@angular/cdk/overlay';
import { inject, type InjectionToken, Service, type TemplateRef } from '@angular/core';
import { SBB_OVERLAY_DATA, SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core';

import type { SbbDialog } from './dialog';
import { SbbDialogConfig } from './dialog-config';
import { SbbDialogContainer } from './dialog-container';
import { SbbDialogRef } from './dialog-ref';

// TODO before next major, create specific InjectionToken
/** Injection token that can be used to access the data that was passed in to a dialog. */
export const SBB_DIALOG_DATA = SBB_OVERLAY_DATA;

@Service()
export class SbbDialogService extends SbbOverlayBaseService<
  SbbDialogContainer,
  SbbDialog,
  SbbDialogRef
> {
  protected parentService = inject(SbbDialogService, { optional: true, skipSelf: true });
  protected containerType = SbbDialogContainer;
  protected refConstructor = SbbDialogRef;
  protected configType = SbbDialogConfig;
  protected override overlayDataToken: InjectionToken<unknown> = SBB_DIALOG_DATA;

  public override open<T = unknown, R = unknown>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: SbbDialogConfig<SbbDialogContainer>,
  ): SbbDialogRef<T, R> {
    return super.open(componentOrTemplateRef, config) as SbbDialogRef<T, R>;
  }
}
