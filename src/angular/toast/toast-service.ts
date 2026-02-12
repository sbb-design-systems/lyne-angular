import type { ComponentType } from '@angular/cdk/overlay';
import type { TemplateRef } from '@angular/core';
import { inject, Injectable } from '@angular/core';
import type { SbbOverlayConfig } from '@sbb-esta/lyne-angular/core/overlay';
import { SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbSimpleToast } from './simple-toast';
import type { SbbToast } from './toast';
import { SbbToastContainer } from './toast-container';
import { SbbToastRef } from './toast-ref';

@Injectable({ providedIn: 'root' })
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
    config?: SbbOverlayConfig<SbbToastContainer, SbbToast>,
  ): SbbToastRef<T> {
    if (typeof content === 'string') {
      const message = content;
      const configWithComponent: SbbOverlayConfig<SbbToastContainer, SbbToast> = {
        ...config,
        data: { message, ...(config?.data || {}) },
      };
      return super.open(SbbSimpleToast, configWithComponent) as SbbToastRef<T>;
    }
    return super.open(content, config) as SbbToastRef<T>;
  }
}
