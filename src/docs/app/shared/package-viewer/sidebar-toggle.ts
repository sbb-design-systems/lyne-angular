import { computed, Injectable, signal } from '@angular/core';
import type { SbbSidebar } from '@sbb-esta/lyne-angular/sidebar';

@Injectable({ providedIn: 'root' })
export class SidebarToggle {
  #sidebar = signal<SbbSidebar | null>(null);
  hasToggle = computed(() => this.#sidebar() !== null);

  register(sidebar: SbbSidebar): void {
    this.#sidebar.set(sidebar);
  }

  unregister(): void {
    this.#sidebar.set(null);
  }

  toggle(): void {
    this.#sidebar()?.toggle();
  }
}
