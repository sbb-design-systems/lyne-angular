import type { ComponentType } from '@angular/cdk/overlay';
import { inject, Service, type TemplateRef } from '@angular/core';
import { SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core';

import { SbbSimpleToast } from './simple-toast';
import type { SbbToast } from './toast';
import type { SbbToastConfig } from './toast-config';
import { SbbToastContainer } from './toast-container';
import { SbbToastRef } from './toast-ref';

@Service()
export class SbbToastService extends SbbOverlayBaseService<
  SbbToastContainer,
  SbbToast,
  SbbToastRef
> {
  protected parentService = inject(SbbToastService, { optional: true, skipSelf: true });
  protected containerType = SbbToastContainer;
  protected overlayRefConstructor = SbbToastRef;

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
