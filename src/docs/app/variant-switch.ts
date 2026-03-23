import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import type {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import type { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

const variantLocalstorageKey = 'sbbAngularVariant';

export type SbbVariant =
  | 'standard'
  | 'standard-off-brand'
  | 'standard-safety'
  | 'lean'
  | 'lean-off-brand'
  | 'lean-safety';

@Injectable({ providedIn: 'root' })
export class VariantSwitch implements CanActivate {
  #router = inject(Router);
  #document = inject(DOCUMENT);
  sbbVariant = new FormControl<SbbVariant>(
    (localStorage.getItem(variantLocalstorageKey) as SbbVariant) || 'lean',
    { nonNullable: true },
  );

  public themes: Record<SbbVariant, string> = {
    standard: 'Standard',
    'standard-off-brand': 'Standard Off-Brand',
    'standard-safety': 'Standard Safety',
    lean: 'Lean',
    'lean-off-brand': 'Lean Off-Brand',
    'lean-safety': 'Lean Safety',
  };

  constructor() {
    this.sbbVariant.valueChanges
      .pipe(startWith(this.sbbVariant.value), takeUntilDestroyed())
      .subscribe((value) => {
        // switch between lean and standard variant
        if (value === 'standard') {
          this.#document.documentElement.classList.remove('sbb-lean');
        } else {
          this.#document.documentElement.classList.add(`sbb-lean`);
        }
        localStorage.setItem(variantLocalstorageKey, value);
      });
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

    const variant = route.queryParamMap.get('variant') as SbbVariant;
    if (this.sbbVariant.value !== variant) {
      this.sbbVariant.setValue(variant);
    }

    const urlTree = this.#router.parseUrl(state.url);
    delete urlTree.queryParams['variant'];

    return urlTree;
  }
}
