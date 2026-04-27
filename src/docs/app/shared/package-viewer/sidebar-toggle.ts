import { computed, Injectable, signal } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import type { SbbSidebar } from '@sbb-esta/lyne-angular/sidebar';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const SESSION_KEY = 'sbbSidebarOpen';

@Injectable({ providedIn: 'root' })
export class SidebarToggle {
  #unregister = new Subject<void>();
  #sidebar = signal<SbbSidebar | null>(null);
  hasToggle = computed(() => this.#sidebar() !== null);
  opened = signal<boolean>(true);

  register(sidebar: SbbSidebar): void {
    this.#sidebar.set(sidebar);
    const stored = sessionStorage.getItem(SESSION_KEY);
    sidebar.opened = stored !== 'false';
    this.opened.set(sidebar.opened);

    merge(
      outputToObservable(sidebar.beforeOpenOutput),
      outputToObservable(sidebar.beforeCloseOutput),
    )
      .pipe(takeUntil(this.#unregister))
      .subscribe((event) => {
        const isOpen = event?.type === 'beforeopen';
        this.opened.set(isOpen);
        try {
          sessionStorage.setItem(SESSION_KEY, String(isOpen));
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
