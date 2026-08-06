import type { ComponentType } from '@angular/cdk/overlay';
import { inject, Service, type TemplateRef } from '@angular/core';
import { SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core';

import type { SbbDialog } from './dialog';
import { SbbDialogConfig } from './dialog-config';
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
  protected refConstructor = SbbDialogRef;
  protected configType = SbbDialogConfig;

  protected override configureContainer(
    element: HTMLElement,
    config: SbbDialogConfig<SbbDialogContainer>,
  ): void {
    this.#updateSizeProp(element, '--sbb-dialog-width', config.width);
    this.#updateSizeProp(element, '--sbb-dialog-height', config.height);
    this.#updateSizeProp(element, '--sbb-dialog-max-width', config.maxWidth);
    this.#updateSizeProp(element, '--sbb-dialog-max-height', config.maxHeight);
  }

  #updateSizeProp(element: HTMLElement, cssVar: string, prop: string | number | undefined): void {
    if (!prop) {
      return;
    }
    element.style.setProperty(cssVar, typeof prop === 'string' ? prop : `${prop}px`);
  }

  public override open<T = unknown, R = unknown>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: SbbDialogConfig<SbbDialogContainer>,
  ): SbbDialogRef<T, R> {
    return super.open(componentOrTemplateRef, config) as SbbDialogRef<T, R>;
  }
}
