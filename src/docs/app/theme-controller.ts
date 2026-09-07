import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Service, signal, untracked } from '@angular/core';
import type {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Router } from '@angular/router';
import type { Observable } from 'rxjs';

const themeLocalstorageKey = 'sbbTheme';

// We use the Inter font for off-brand themes
const interFontElement = document.createElement('link');
interFontElement.href =
  'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap';
interFontElement.rel = 'stylesheet';

type SbbTheme =
  'standard' | 'standard-off-brand' | 'standard-safety' | 'lean' | 'lean-off-brand' | 'lean-safety';

@Service()
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
  fileName = computed(() => {
    const fileName = this.#theme().replace('standard-', '');
    const normalizedName = fileName === 'theme' ? 'standard-theme' : fileName;

    return `${normalizedName}-theme.css`;
  });

  constructor() {
    effect(() => {
      const fileName = this.fileName();

      this.#document.head
        .querySelector('#theme')
        ?.setAttribute('href', `assets/themes/angular/${fileName}`);
      this.#document.head
        .querySelector('#theme-experimental')
        ?.setAttribute('href', `assets/themes/angular-experimental/${fileName}`);

      localStorage.setItem(
        themeLocalstorageKey,
        untracked(() => this.#theme()),
      );
    });

    effect(() => {
      const brand = this.brand();

      if (brand === 'off-brand' && !interFontElement.isConnected) {
        this.#document.head.appendChild(interFontElement);
      } else {
        interFontElement.remove();
      }
    });
  }

  setBrand(offBrand: 'default' | 'off-brand' | 'safety') {
    const newTheme = `${this.size()}${offBrand === 'default' ? '' : '-' + offBrand}` as SbbTheme;
    this.#setTheme(newTheme);
  }

  setSize(size: 'standard' | 'lean') {
    const brandType = this.brand();
    const newTheme = `${size}${brandType === 'default' ? '' : '-' + brandType}` as SbbTheme;
    this.#setTheme(newTheme);
  }

  #setTheme(theme: SbbTheme) {
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

    this.#setTheme(route.queryParamMap.get('theme') as SbbTheme);

    const urlTree = this.#router.parseUrl(state.url);
    delete urlTree.queryParams['theme'];

    return urlTree;
  }
}
