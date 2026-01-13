import type { Injector, StaticProvider, ViewContainerRef } from '@angular/core';

import type { SbbOverlayContainerBase } from './overlay-container-base';
import type { SbbOverlayRef } from './overlay-ref';

export class SbbOverlayConfig<C extends SbbOverlayContainerBase, I = unknown, D = unknown> {
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  viewContainerRef?: ViewContainerRef;

  /**
   * Injector used for the instantiation of the component to be attached. If provided,
   * takes precedence over the injector indirectly provided by `ViewContainerRef`.
   */
  injector?: Injector;

  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /**
   * Providers that will be exposed to the contents of the dialog. Can also
   * be provided as a function in order to generate the providers lazily.
   */
  providers?:
    | StaticProvider[]
    | ((
        overlayRef: SbbOverlayRef,
        config: SbbOverlayConfig<C, I>,
        container: C,
      ) => StaticProvider[]);

  /** Data being injected into the child component. */
  data?: D | null;

  /**
   * Context that will be passed to template-based dialogs.
   * A function can be passed in to resolve the context lazily.
   */
  templateContext?: Record<string, unknown> | (() => Record<string, unknown>);

  /**
   * A function that can be used to configure the container component.
   */
  setupContainer?: (instance: I) => void;

  /**
   * Whether the overlay should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation?: boolean = true;
}
