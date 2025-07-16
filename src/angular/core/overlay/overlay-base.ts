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

export abstract class _SbbOverlayBaseService<
  C extends SbbOverlayContainerBase,
  I = unknown,
  R extends SbbOverlayRef<unknown> = SbbOverlayRef<unknown>,
> {
  private readonly _openDialogsAtThisLevel: R[] = [];
  private readonly _afterAllClosedAtThisLevel = new Subject<void>();
  private readonly _afterOpenedAtThisLevel = new Subject<R>();
  private _idGenerator = inject(_IdGenerator);

  private _createInjector<D>(
    config: SbbOverlayConfig<C, I, D>,
    dialogRef: SbbOverlayRef,
    dialogContainer: C,
    fallbackInjector: Injector,
  ): Injector {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers: StaticProvider[] = [
      { provide: this._dialogContainerType, useValue: dialogContainer },
      { provide: this._dialogRefConstructor, useValue: dialogRef },
    ];

    if (config.data) {
      providers.push({ provide: this._dialogDataToken, useValue: config.data });
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

  private _attachContainer(overlayRef: OverlayRef, config: SbbOverlayConfig<C, I>): C {
    const containerType: Type<C> = this._dialogContainerType;
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

  private _attachContent<D = unknown>(
    componentOrTemplateRef: ComponentType<D> | TemplateRef<D>,
    dialogRef: SbbOverlayRef<D>,
    dialogContainer: C,
    config: SbbOverlayConfig<C, I, D>,
  ) {
    const injector = this._createInjector(config, dialogRef, dialogContainer, this.injector);
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
    config: SbbOverlayConfig<C, I>,
  ): R {
    config.id = config.id || this._idGenerator.getId('cdk-dialog-');

    if (
      config.id &&
      this.getDialogById(config.id) &&
      (typeof ngDevMode === 'undefined' || ngDevMode)
    ) {
      throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
    }

    const overlayRef: OverlayRef = createOverlayRef(this.injector);
    const dialogContainer = this._attachContainer(overlayRef, config);
    const dialogRef = new this._dialogRefConstructor(dialogContainer, config);

    this._attachContent(componentOrTemplateRef, dialogRef, dialogContainer, config);
    dialogContainer.open();

    this.openDialogs.push(dialogRef!);
    this.afterOpened.next(dialogRef!);

    dialogRef!.afterClosed().subscribe(() => {
      const index = this.openDialogs.indexOf(dialogRef);

      if (index > -1) {
        this.openDialogs.splice(index, 1);

        if (!this.openDialogs.length) {
          this._getAfterAllClosed().next();
        }
      }
    });

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
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }

  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll(): void {
    const overlays = this.openDialogs;
    overlays.map((ref: R) => ref.close());
  }

  private _getAfterAllClosed(): Subject<void> {
    const parent = this._parentDialog;
    return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
  }

  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  readonly afterAllClosed: Observable<void> = defer(
    () =>
      this.openDialogs.length
        ? this._getAfterAllClosed()
        : this._getAfterAllClosed().pipe(startWith(undefined)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as Observable<any>;

  /** Stream that emits when a dialog has been opened. */
  get afterOpened(): Subject<R> {
    return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
  }

  constructor(
    public injector: Injector,
    private _parentDialog: _SbbOverlayBaseService<C, I, R> | null,
    private _dialogContainerType: Type<C>,
    private _dialogRefConstructor: Type<R>,
    private _dialogDataToken: InjectionToken<unknown>,
  ) {}
}
