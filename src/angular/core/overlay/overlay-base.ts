import { _IdGenerator } from '@angular/cdk/a11y';
import { type ComponentType, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  ApplicationRef,
  type ComponentRef,
  DOCUMENT,
  inject,
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  type OnDestroy,
  type StaticProvider,
  TemplateRef,
  type Type,
} from '@angular/core';
import { defer, type Observable, startWith, Subject } from 'rxjs';

import { SbbOverlayConfig } from './overlay-config';
import type { SbbOverlayContainerBase } from './overlay-container-base';
import { SbbOverlayRef } from './overlay-ref';

/** Injection token that can be used to access the data that was passed in to an overlay. */
export const SBB_OVERLAY_DATA = new InjectionToken<unknown>('SbbOverlayData');

@Injectable()
export abstract class SbbOverlayBaseService<
  C extends SbbOverlayContainerBase,
  // Type of Container Instance
  I = unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  R extends SbbOverlayRef<any> = SbbOverlayRef<any>,
> implements OnDestroy {
  #openOverlaysAtThisLevel: R[] = [];
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
      { provide: this.containerType, useValue: overlayContainer },
      { provide: this.overlayRefConstructor, useValue: overlayRef },
    ];

    if (config.data) {
      providers.push({ provide: this.overlayDataToken, useValue: config.data });
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

  #attachContainer(portalOutlet: DomPortalOutlet, config: SbbOverlayConfig<C, I>): C {
    const containerType: Type<C> = this.containerType;
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers: StaticProvider[] = [
      { provide: SbbOverlayConfig, useValue: config },
      { provide: DomPortalOutlet, useValue: portalOutlet },
    ];
    const containerPortal = new ComponentPortal(
      containerType,
      config.viewContainerRef,
      Injector.create({ parent: userInjector, providers }),
    );
    const componentRef = portalOutlet.attach(containerPortal);

    const ngZone = this.injector.get(NgZone);

    if (typeof componentRef?.onDestroy === 'function') {
      // In most cases we control the portal and we know when it is being detached so that
      // we can finish the disposal process. The exception is if the user passes in a custom
      // `ViewContainerRef` that isn't destroyed through the overlay API. Note that we use
      // `detach` here instead of `dispose`, because we don't know if the user intends to
      // reattach the overlay at a later point. It also has the advantage of waiting for animations.
      componentRef.onDestroy(() => {
        if (portalOutlet.hasAttached()) {
          // We have to delay the `detach` call, because detaching immediately prevents
          // other destroy hooks from running. This is likely a framework bug similar to
          // https://github.com/angular/angular/issues/46119
          ngZone.runOutsideAngular(() =>
            Promise.resolve().then(() => {
              if (portalOutlet.hasAttached()) {
                portalOutlet.detach();
              }
            }),
          );
        }
      });
    }

    config.setupContainer?.(componentRef.instance.elementInstance as I);

    return componentRef.instance;
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

    const overlayContainerElement = this.injector.get(OverlayContainer).getContainerElement();

    // Additional element is needed as DomPortalOutlet would remove the overlayContainerElement element on
    // dispose. We must not remove the entire overlay container as it is considered living forever after first instantiation.
    const host = this.injector.get(DOCUMENT).createElement('div');
    overlayContainerElement.appendChild(host);

    const portalOutlet = new DomPortalOutlet(
      host,
      this.injector.get(ApplicationRef),
      this.injector,
    );
    const overlayContainer = this.#attachContainer(portalOutlet, config);

    const overlayRefConstructed = new this.overlayRefConstructor(
      overlayContainer,
      config,
      portalOutlet,
    );

    this.#attachContent(componentOrTemplateRef, overlayRefConstructed, overlayContainer, config);

    this.openOverlays.push(overlayRefConstructed);
    this.afterOpened.next(overlayRefConstructed);

    overlayRefConstructed.afterClose.subscribe((event) => {
      if (!event) {
        return;
      }
      this.#removeOpenOverlay(overlayRefConstructed, true);
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
   * @deprecated use `openOverlays` instead.
   */
  get openDialogs(): R[] {
    return this.openOverlays;
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
    return this.parentService ? this.parentService.openOverlays : this.#openOverlaysAtThisLevel;
  }

  /**
   * Closes all currently-open overlays.
   */
  closeAll(): void {
    this.openOverlays.map((ref: R) => ref.close());
  }

  #getAfterAllClosed(): Subject<void> {
    const parent = this.parentService;
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
    return this.parentService ? this.parentService.afterOpened : this.#afterOpenedAtThisLevel;
  }

  protected abstract parentService: SbbOverlayBaseService<C, I, R> | null;
  protected abstract containerType: Type<C>;
  protected overlayRefConstructor: Type<R> = SbbOverlayRef as Type<R>;
  protected overlayDataToken: InjectionToken<unknown> = SBB_OVERLAY_DATA;

  // TODO: make private
  // @breaking-change
  injector = inject(Injector);

  /*
   * @breaking-change Remove `...args: unknown[]` and make the constructor private.
   */
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(..._args: unknown[]);
  constructor() {
    /* empty */
  }

  ngOnDestroy() {
    // Make a second pass and close the remaining dialogs. We do this second pass in order to
    // correctly dispatch the `afterAllClosed` event in case we have a mixed array of dialogs
    // that should be closed and dialogs that should not.
    this.#openOverlaysAtThisLevel.reverse().forEach((dialog) => dialog.close());
    this.#afterAllClosedAtThisLevel.complete();
    this.#afterOpenedAtThisLevel.complete();
    this.#openOverlaysAtThisLevel = [];
  }

  #removeOpenOverlay(overlayRef: R, emitEvent: boolean): void {
    const index = this.openOverlays.indexOf(overlayRef);

    if (index > -1) {
      this.openOverlays.splice(index, 1);

      if (!this.openOverlays.length && emitEvent) {
        this.#getAfterAllClosed().next();
      }
    }
  }
}
