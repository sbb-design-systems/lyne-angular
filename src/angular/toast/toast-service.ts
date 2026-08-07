import type { ComponentType } from '@angular/cdk/overlay';
import { inject, type InjectionToken, Service, type TemplateRef } from '@angular/core';
import { SBB_OVERLAY_DATA, SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core';

import { SbbSimpleToast } from './simple-toast';
import type { SbbToast } from './toast';
import { SbbToastConfig } from './toast-config';
import { SbbToastContainer } from './toast-container';
import { SbbToastRef } from './toast-ref';

// TODO before next major, create specific InjectionToken
/** Injection token that can be used to access the data that was passed in to a toast. */
export const SBB_TOAST_DATA = SBB_OVERLAY_DATA;

@Service()
export class SbbToastService extends SbbOverlayBaseService<
  SbbToastContainer,
  SbbToast,
  SbbToastRef
> {
  protected parentService = inject(SbbToastService, { optional: true, skipSelf: true });
  protected containerType = SbbToastContainer;
  protected refConstructor = SbbToastRef;
  protected configType = SbbToastConfig;
  protected override overlayDataToken: InjectionToken<unknown> = SBB_TOAST_DATA;

  override open<T = unknown | SbbSimpleToast>(
    content: ComponentType<T> | TemplateRef<T> | string,
    config?: SbbToastConfig<SbbToastContainer>,
  ): SbbToastRef<T> {
    if (typeof content === 'string') {
      const message = content;
      const configWithComponent: SbbToastConfig<SbbToastContainer> = {
        ...config,
        data: { message, ...(config?.data || {}) },
      };
      return super.open(SbbSimpleToast, configWithComponent) as SbbToastRef<T>;
    }
    return super.open(content, config) as SbbToastRef<T>;
  }
}
