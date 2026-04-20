import { computed, Injectable, signal } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import type { SbbSidebar } from '@sbb-esta/lyne-angular/sidebar';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const SESSION_KEY = 'sbbSidebarOpen';

@Injectable({ providedIn: 'root' })
export class SidebarToggle {
  #sidebar = signal<SbbSidebar | null>(null);
  hasToggle = computed(() => this.#sidebar() !== null);
  #unregister = new Subject<void>();

  register(sidebar: SbbSidebar): void {
    this.#sidebar.set(sidebar);
    const stored = sessionStorage.getItem(SESSION_KEY);
    sidebar.opened = stored !== 'false';

    merge(outputToObservable(sidebar.openOutput), outputToObservable(sidebar.closeOutput))
      .pipe(takeUntil(this.#unregister))
      .subscribe(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, String(this.#sidebar()?.opened ?? true));
        } catch (e) {
          console.error('Error writing to sessionStorage', e);
        }
      });
  }

  unregister(): void {
    this.#unregister.next();
    this.#sidebar.set(null);
  }

  toggle(): void {
    this.#sidebar()?.toggle();
  }
}
