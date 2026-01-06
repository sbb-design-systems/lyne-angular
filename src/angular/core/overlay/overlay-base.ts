import { _IdGenerator } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import {
  type ComponentType,
  OverlayConfig,
  OverlayContainer,
  OverlayKeyboardDispatcher,
  OverlayOutsideClickDispatcher,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import {
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  type ComponentRef,
  DOCUMENT,
  EnvironmentInjector,
  inject,
  InjectionToken,
  Injector,
  NgZone,
  Renderer2,
  RendererFactory2,
  type StaticProvider,
  TemplateRef,
  type Type,
} from '@angular/core';
import { defer, type Observable, startWith, Subject } from 'rxjs';

import { SbbOverlayConfig } from './overlay-config';
import type { SbbOverlayContainerBase } from './overlay-container-base';
import type { SbbOverlayRef } from './overlay-ref';

/**
 * Creates an overlay.
 * @param injector Injector to use when resolving the overlay's dependencies.
 * @param config Configuration applied to the overlay.
 * @returns Reference to the created overlay.
 */
export function createOverlayRef(injector: Injector, config?: OverlayConfig): OverlayRef {
  const overlayContainer = injector.get(OverlayContainer);
  const doc = injector.get(DOCUMENT);
  const idGenerator = injector.get(_IdGenerator);
  const appRef = injector.get(ApplicationRef);
  const directionality = injector.get(Directionality);

  const host = doc.createElement('div');
  const pane = doc.createElement('div');

  pane.id = idGenerator.getId('cdk-overlay-');
  pane.classList.add('cdk-overlay-pane');
  host.appendChild(pane);
  overlayContainer.getContainerElement().appendChild(host);

  const portalOutlet = new DomPortalOutlet(pane, appRef, injector);
  const overlayConfig = new OverlayConfig(config);
  const renderer =
    injector.get(Renderer2, null, { optional: true }) ||
    injector.get(RendererFactory2).createRenderer(null, null);

  overlayConfig.direction = overlayConfig.direction || directionality.value;

  return new OverlayRef(
    portalOutlet,
    host,
    pane,
    overlayConfig,
    injector.get(NgZone),
    injector.get(OverlayKeyboardDispatcher),
    doc,
    injector.get(Location),
    injector.get(OverlayOutsideClickDispatcher),
    config?.disableAnimations ??
      injector.get(ANIMATION_MODULE_TYPE, null, { optional: true }) === 'NoopAnimations',
    injector.get(EnvironmentInjector),
    renderer,
  );
}

/** Injection token that can be used to access the data that was passed in to an overlay. */
export const SBB_OVERLAY_DATA = new InjectionToken<unknown>('SbbOverlayData');

export abstract class SbbOverlayBaseService<
  C extends SbbOverlayContainerBase,
  // Type of Container Instance
  I = unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  R extends SbbOverlayRef<any> = SbbOverlayRef<any>,
> {
  readonly #openOverlaysAtThisLevel: R[] = [];
  readonly #afterAllClosedAtThisLevel = new Subject<void>();
  readonly #afterOpenedAtThisLevel = new Subject<R>();
  #idGenerator = inject(_IdGenerator);

  #createInjector<D>(
    config: SbbOverlayConfig<C, I, D>,
    overlayRef: SbbOverlayRef,
    overlayContainer: C,
    fallbackInjector: Injector,
  ): Injector {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers: StaticProvider[] = [
      { provide: this.#overlayContainerType, useValue: overlayContainer },
      { provide: this.#overlayRefConstructor, useValue: overlayRef },
    ];

    if (config.data) {
      providers.push({ provide: this.#overlayDataToken, useValue: config.data });
    }
    if (config.providers) {
      if (typeof config.providers === 'function') {
        providers.push(...config.providers(overlayRef, config, overlayContainer));
      } else {
        providers.push(...config.providers);
      }
    }

    return Injector.create({ providers, parent: userInjector || fallbackInjector });
  }

  #attachContainer(overlayRef: OverlayRef, config: SbbOverlayConfig<C, I>): C {
    const containerType: Type<C> = this.#overlayContainerType;
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers: StaticProvider[] = [
      { provide: SbbOverlayConfig, useValue: config },
      { provide: OverlayRef, useValue: overlayRef },
    ];
    const containerPortal = new ComponentPortal(
      containerType,
      config.viewContainerRef,
      Injector.create({ parent: userInjector, providers }),
    );
    const containerRef = overlayRef.attach(containerPortal);

    if (config.setupContainer) {
      config.setupContainer(containerRef.instance.elementInstance as I);
    }

    return containerRef.instance;
  }

  #attachContent<D = unknown>(
    componentOrTemplateRef: ComponentType<D> | TemplateRef<D>,
    overlayRef: SbbOverlayRef<D>,
    overlayContainer: C,
    config: SbbOverlayConfig<C, I, D>,
  ) {
    const injector = this.#createInjector(config, overlayRef, overlayContainer, this.injector);
    if (componentOrTemplateRef instanceof TemplateRef) {
      let context = { $implicit: config.data, overlayRef: overlayRef };

      if (config.templateContext) {
        context = {
          ...context,
          ...(typeof config.templateContext === 'function'
            ? config.templateContext()
            : config.templateContext),
        };
      }

      overlayContainer.attachTemplatePortal(
        new TemplatePortal<unknown>(
          componentOrTemplateRef,
          config.viewContainerRef || null!,
          context,
          injector,
        ),
      );
    } else {
      const contentRef = overlayContainer.attachComponentPortal<D>(
        new ComponentPortal<D>(componentOrTemplateRef, config.viewContainerRef, injector),
      );
      (overlayRef as { componentRef: ComponentRef<D> }).componentRef = contentRef;
      (overlayRef as { componentInstance: D }).componentInstance = contentRef.instance;
    }
  }

  open<T = unknown>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config: SbbOverlayConfig<C, I> = {},
  ): SbbOverlayRef<T> {
    config.id = config.id || this.#idGenerator.getId('cdk-overlay-');

    if (
      config.id &&
      this.getOverlayById(config.id) &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw Error(`Overlay with id "${config.id}" exists already. The overlay id must be unique.`);
    }

    const overlayRef: OverlayRef = createOverlayRef(this.injector);
    const overlayContainer = this.#attachContainer(overlayRef, config);

    const overlayRefConstructed = new this.#overlayRefConstructor(
      overlayContainer,
      config,
      overlayRef,
    );

    this.#attachContent(componentOrTemplateRef, overlayRefConstructed, overlayContainer, config);

    this.openOverlays.push(overlayRefConstructed);
    this.afterOpened.next(overlayRefConstructed);

    overlayRefConstructed!.afterClose.subscribe((event) => {
      if (!event) {
        return;
      }
      const index = this.openOverlays.indexOf(overlayRefConstructed);

      if (index > -1) {
        this.openOverlays.splice(index, 1);

        if (!this.openOverlays.length) {
          this.#getAfterAllClosed().next();
        }
      }
    });

    overlayContainer.open();

    return overlayRefConstructed;
  }

  /**
   * Finds an open overlay by its id.
   * @param id ID to use when looking up the overlays.
   * @deprecated use `getOverlayById` instead.
   */
  getDialogById(id: string): R | undefined {
    return this.getOverlayById(id);
  }

  /**
   * Keeps track of the currently-open overlays.
   *  @deprecated use `openOverlays` instead.
   */
  get openDialogs(): R[] {
    return this.#parentOverlay ? this.#parentOverlay.openOverlays : this.#openOverlaysAtThisLevel;
  }

  /**
   * Finds an open overlay by its id.
   * @param id ID to use when looking up the overlay.
   */
  getOverlayById(id: string): R | undefined {
    return this.openOverlays.find((overlay) => overlay.id === id);
  }

  /** Keeps track of the currently-open overlays. */
  get openOverlays(): R[] {
    return this.#parentOverlay ? this.#parentOverlay.openOverlays : this.#openOverlaysAtThisLevel;
  }

  /**
   * Closes all currently-open overlays.
   */
  closeAll(): void {
    const overlays = this.openOverlays;
    overlays.map((ref: R) => ref.close());
  }

  #getAfterAllClosed(): Subject<void> {
    const parent = this.#parentOverlay;
    return parent ? parent.#getAfterAllClosed() : this.#afterAllClosedAtThisLevel;
  }

  /**
   * Stream that emits when all open overlays have finished closing.
   * Will emit on subscribe if there are no open overlays to begin with.
   */
  readonly afterAllClosed: Observable<void> = defer(
    () =>
      this.openOverlays.length
        ? this.#getAfterAllClosed()
        : this.#getAfterAllClosed().pipe(startWith(undefined)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as Observable<any>;

  /** Stream that emits when an overlay has been opened. */
  get afterOpened(): Subject<R> {
    return this.#parentOverlay ? this.#parentOverlay.afterOpened : this.#afterOpenedAtThisLevel;
  }

  #parentOverlay: SbbOverlayBaseService<C, I, R> | null;
  #overlayContainerType: Type<C>;
  #overlayRefConstructor: Type<R>;
  #overlayDataToken: InjectionToken<unknown>;

  constructor(
    public injector: Injector,
    parentOverlay: SbbOverlayBaseService<C, I, R> | null,
    overlayContainerType: Type<C>,
    overlayRefConstructor: Type<R>,
    overlayDataToken: InjectionToken<unknown>,
  ) {
    this.#parentOverlay = parentOverlay;
    this.#overlayContainerType = overlayContainerType;
    this.#overlayRefConstructor = overlayRefConstructor;
    this.#overlayDataToken = overlayDataToken;
  }
}
