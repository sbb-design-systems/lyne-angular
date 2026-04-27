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
import { startWith, type Observable } from 'rxjs';

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
  brand = computed(() =>
    this.#theme().endsWith('off-brand')
      ? 'off-brand'
      : this.#theme().endsWith('safety')
        ? 'safety'
        : 'default',
  );
  size = computed(() => (this.#theme().startsWith('standard') ? 'standard' : 'lean'));

  constructor() {
    toObservable(this.#theme)
      .pipe(startWith(this.#theme()))
      .subscribe((value) => {
        // TODO: replace sbb-lean class with theme file after CSS refactoring
        if (value.includes('standard')) {
          this.#document.documentElement.classList.remove('sbb-lean');
        } else {
          this.#document.documentElement.classList.add(`sbb-lean`);
        }

        let cssFileName = value.replace('lean', 'standard').replace('standard-', '');
        if (cssFileName === 'theme') {
          cssFileName = 'standard-theme';
        }

        this.#document.head
          .querySelector('#theme')
          ?.setAttribute('href', `assets/themes/angular/${cssFileName}-theme.css`);
        this.#document.head
          .querySelector('#theme-experimental')
          ?.setAttribute('href', `assets/themes/angular-experimental/${cssFileName}-theme.css`);
        localStorage.setItem(themeLocalstorageKey, value);
      });
  }

  setBrand(offBrand: 'default' | 'off-brand' | 'safety') {
    const newTheme = `${this.size()}${offBrand === 'default' ? '' : '-' + offBrand}` as SbbTheme;
    this.#setThemeWithReload(newTheme);
  }

  setSize(size: 'standard' | 'lean') {
    const brandType = this.brand();
    const newTheme = `${size}${brandType === 'default' ? '' : '-' + brandType}` as SbbTheme;
    this.#setThemeWithReload(newTheme);
  }

  #setTheme(theme: SbbTheme) {
    if (this.#theme() === theme) {
      return;
    }
    this.#theme.set(theme);
  }

  #setThemeWithReload(theme: SbbTheme) {
    this.#setTheme(theme);

    // TODO: remove after CSS refactoring
    window.location.reload();
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

    this.#setTheme(route.queryParamMap.get('theme') as SbbTheme);

    const urlTree = this.#router.parseUrl(state.url);
    delete urlTree.queryParams['theme'];

    return urlTree;
  }
}
