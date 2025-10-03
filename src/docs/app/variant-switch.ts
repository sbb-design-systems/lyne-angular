import { DOCUMENT } from '@angular/common';
import type { OnDestroy } from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import type {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

const variantLocalstorageKey = 'sbbAngularVariant';

type SbbVariantLightDark = 'standard' | 'lean' | 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class VariantSwitch implements CanActivate, OnDestroy {
  sbbVariant = new FormControl<SbbVariantLightDark>(
    (localStorage.getItem(variantLocalstorageKey) as SbbVariantLightDark) || 'standard',
    { nonNullable: true },
  );
  private _destroyed = new Subject<void>();
  private _router = inject(Router);
  private _document = inject(DOCUMENT);

  constructor() {
    this.sbbVariant.valueChanges
      .pipe(startWith(this.sbbVariant.value), takeUntil(this._destroyed))
      .subscribe((value) => {
        // switch between lean and standard variant
        if (value === 'standard') {
          this._document.documentElement.classList.remove('sbb-lean');
        } else {
          this._document.documentElement.classList.add(`sbb-lean`);
        }
        localStorage.setItem(variantLocalstorageKey, value);

        // switch between light and dark mode
        this._document.documentElement.classList.remove(...['sbb-dark', 'sbb-light']);
        if (value === 'light') {
          this._document.documentElement.classList.add('sbb-light');
        } else if (value === 'dark') {
          this._document.documentElement.classList.add('sbb-dark');
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /**
   * Reads the query parameter for variant, updates the current variant if necessary
   * and removes the query parameter from the url
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!route.queryParamMap.has('variant')) {
      return true;
    }

    const variant = route.queryParamMap.get('variant') as SbbVariantLightDark;
    if (this.sbbVariant.value !== variant) {
      this.sbbVariant.setValue(variant);
    }

    const urlTree = this._router.parseUrl(state.url);
    delete urlTree.queryParams['variant'];

    return urlTree;
  }
}
