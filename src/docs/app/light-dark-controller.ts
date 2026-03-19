import { computed, Injectable, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const LOCAL_STORE_KEY = 'sbbDarkMode';

@Injectable({
  providedIn: 'root',
})
export class LightDarkController {
  #query = window.matchMedia('(prefers-color-scheme: dark)');
  #osPreferredState = toSignal<boolean>(
    fromEvent<MediaQueryList>(this.#query, 'change').pipe(
      startWith(this.#query),
      map((event) => !!event.matches),
    ),
  );
  #darkModeOverride = signal<boolean | undefined>(this.#readLocalStorageState());

  public isDarkMode = computed<boolean>(
    () => this.#darkModeOverride() ?? this.#osPreferredState() ?? false,
  );

  constructor() {
    toObservable(this.isDarkMode).subscribe((isDarkMode) => {
      const newClass = isDarkMode ? 'sbb-dark' : 'sbb-light';
      document.documentElement.classList.remove('sbb-dark', 'sbb-light');
      document.documentElement.classList.add(newClass);
    });

    toObservable(this.#darkModeOverride).subscribe((isDarkMode) => {
      if (isDarkMode === undefined) {
        window.localStorage.removeItem(LOCAL_STORE_KEY);
        return;
      }
      try {
        window.localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(isDarkMode));
      } catch (e) {
        console.error('Error writing to localStorage', e);
      }
    });
  }

  toggle() {
    this.#darkModeOverride.set(!this.isDarkMode());
  }

  #readLocalStorageState() {
    try {
      if (window.localStorage.getItem(LOCAL_STORE_KEY)) {
        return window.localStorage.getItem(LOCAL_STORE_KEY) === 'true';
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return undefined;
  }
}
