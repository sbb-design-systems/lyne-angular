import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import type {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import type { Observable } from 'rxjs';

const themeLocalstorageKey = 'sbbTheme';

type SbbTheme =
  | 'standard'
  | 'standard-off-brand'
  | 'standard-safety'
  | 'lean'
  | 'lean-off-brand'
  | 'lean-safety';

@Injectable({ providedIn: 'root' })
export class ThemeController implements CanActivate {
  #router = inject(Router);
  #document = inject(DOCUMENT);

  #theme = signal((localStorage.getItem(themeLocalstorageKey) as SbbTheme) || 'standard');
  theme = this.#theme.asReadonly();
  themeName = computed(() => this.#themes[this.#theme()]);

  #themes: Record<SbbTheme, string> = {
    standard: 'Standard',
    'standard-off-brand': 'Standard Off-Brand',
    'standard-safety': 'Standard Safety',
    lean: 'Lean',
    'lean-off-brand': 'Lean Off-Brand',
    'lean-safety': 'Lean Safety',
  };
  public themeEntries = Object.entries(this.#themes) as [SbbTheme, string][];

  constructor() {
    toObservable(this.#theme).subscribe((value) => {
      // switch between lean and standard theme
      if (value.includes('standard')) {
        this.#document.documentElement.classList.remove('sbb-lean');
      } else {
        this.#document.documentElement.classList.add(`sbb-lean`);
      }
      localStorage.setItem(themeLocalstorageKey, value);
    });
  }

  public setTheme(theme: SbbTheme) {
    if (this.#theme() === theme) {
      return;
    }
    this.#theme.set(theme);
  }

  /**
   * Reads the query parameter for theme, updates the current theme if necessary
   * and removes the query parameter from the url
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!route.queryParamMap.has('theme')) {
      return true;
    }

    this.setTheme(route.queryParamMap.get('theme') as SbbTheme);

    const urlTree = this.#router.parseUrl(state.url);
    delete urlTree.queryParams['theme'];

    return urlTree;
  }
}
