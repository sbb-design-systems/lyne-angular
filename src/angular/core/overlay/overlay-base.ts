import { _IdGenerator } from '@angular/cdk/a11y';
import { type ComponentType, createOverlayRef, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  type ComponentRef,
  inject,
  InjectionToken,
  Injector,
  type StaticProvider,
  TemplateRef,
  type Type,
} from '@angular/core';
import { defer, type Observable, startWith, Subject } from 'rxjs';

import { SbbOverlayConfig } from './overlay-config';
import type { SbbOverlayContainerBase } from './overlay-container-base';
import type { SbbOverlayRef } from './overlay-ref';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const SBB_OVERLAY_DATA = new InjectionToken<unknown>('SbbOverlayData');

export abstract class SbbOverlayBaseService<
  C extends SbbOverlayContainerBase,
  // Type of Container Instance
  I = unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  R extends SbbOverlayRef<any> = SbbOverlayRef<any>,
> {
  readonly #openDialogsAtThisLevel: R[] = [];
  readonly #afterAllClosedAtThisLevel = new Subject<void>();
  readonly #afterOpenedAtThisLevel = new Subject<R>();
  #idGenerator = inject(_IdGenerator);

  #createInjector<D>(
    config: SbbOverlayConfig<C, I, D>,
    dialogRef: SbbOverlayRef,
    dialogContainer: C,
    fallbackInjector: Injector,
  ): Injector {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers: StaticProvider[] = [
      { provide: this.#dialogContainerType, useValue: dialogContainer },
      { provide: this.#dialogRefConstructor, useValue: dialogRef },
    ];

    if (config.data) {
      providers.push({ provide: this.#dialogDataToken, useValue: config.data });
    }
    if (config.providers) {
      if (typeof config.providers === 'function') {
        providers.push(...config.providers(dialogRef, config, dialogContainer));
      } else {
        providers.push(...config.providers);
      }
    }

    return Injector.create({ providers, parent: userInjector || fallbackInjector });
  }

  #attachContainer(overlayRef: OverlayRef, config: SbbOverlayConfig<C, I>): C {
    const containerType: Type<C> = this.#dialogContainerType;
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
    dialogRef: SbbOverlayRef<D>,
    dialogContainer: C,
    config: SbbOverlayConfig<C, I, D>,
  ) {
    const injector = this.#createInjector(config, dialogRef, dialogContainer, this.injector);
    if (componentOrTemplateRef instanceof TemplateRef) {
      let context = { $implicit: config.data, dialogRef };

      if (config.templateContext) {
        context = {
          ...context,
          ...(typeof config.templateContext === 'function'
            ? config.templateContext()
            : config.templateContext),
        };
      }

      dialogContainer.attachTemplatePortal(
        new TemplatePortal<unknown>(
          componentOrTemplateRef,
          config.viewContainerRef || null!,
          context,
          injector,
        ),
      );
    } else {
      const contentRef = dialogContainer.attachComponentPortal<D>(
        new ComponentPortal<D>(componentOrTemplateRef, config.viewContainerRef, injector),
      );
      (dialogRef as { componentRef: ComponentRef<D> }).componentRef = contentRef;
      (dialogRef as { componentInstance: D }).componentInstance = contentRef.instance;
    }
  }

  open<T = unknown>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config: SbbOverlayConfig<C, I> = {},
  ): SbbOverlayRef<T> {
    config.id = config.id || this.#idGenerator.getId('cdk-dialog-');

    if (
      config.id &&
      this.getDialogById(config.id) &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
    }

    const overlayRef: OverlayRef = createOverlayRef(this.injector);
    const dialogContainer = this.#attachContainer(overlayRef, config);

    const dialogRef = new this.#dialogRefConstructor(dialogContainer, config, overlayRef);

    this.#attachContent(componentOrTemplateRef, dialogRef, dialogContainer, config);

    this.openDialogs.push(dialogRef!);
    this.afterOpened.next(dialogRef!);

    dialogRef!.afterClose.subscribe((event) => {
      if (!event) {
        return;
      }
      const index = this.openDialogs.indexOf(dialogRef);

      if (index > -1) {
        this.openDialogs.splice(index, 1);

        if (!this.openDialogs.length) {
          this.#getAfterAllClosed().next();
        }
      }
    });

    dialogContainer.open();

    return dialogRef;
  }

  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string): R | undefined {
    return this.openDialogs.find((dialog) => dialog.id === id);
  }

  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): R[] {
    return this.#parentDialog ? this.#parentDialog.openDialogs : this.#openDialogsAtThisLevel;
  }

  /**
   * Closes all currently-open dialogs.
   */
  closeAll(): void {
    const overlays = this.openDialogs;
    overlays.map((ref: R) => ref.close());
  }

  #getAfterAllClosed(): Subject<void> {
    const parent = this.#parentDialog;
    return parent ? parent.#getAfterAllClosed() : this.#afterAllClosedAtThisLevel;
  }

  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  readonly afterAllClosed: Observable<void> = defer(
    () =>
      this.openDialogs.length
        ? this.#getAfterAllClosed()
        : this.#getAfterAllClosed().pipe(startWith(undefined)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as Observable<any>;

  /** Stream that emits when a dialog has been opened. */
  get afterOpened(): Subject<R> {
    return this.#parentDialog ? this.#parentDialog.afterOpened : this.#afterOpenedAtThisLevel;
  }

  #parentDialog: SbbOverlayBaseService<C, I, R> | null;
  #dialogContainerType: Type<C>;
  #dialogRefConstructor: Type<R>;
  #dialogDataToken: InjectionToken<unknown>;

  constructor(
    public injector: Injector,
    parentDialog: SbbOverlayBaseService<C, I, R> | null,
    dialogContainerType: Type<C>,
    dialogRefConstructor: Type<R>,
    dialogDataToken: InjectionToken<unknown>,
  ) {
    this.#parentDialog = parentDialog;
    this.#dialogContainerType = dialogContainerType;
    this.#dialogRefConstructor = dialogRefConstructor;
    this.#dialogDataToken = dialogDataToken;
  }
}
