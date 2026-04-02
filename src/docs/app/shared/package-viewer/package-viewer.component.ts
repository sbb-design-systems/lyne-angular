import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeaderScrollOrigin } from '@sbb-esta/lyne-angular/header';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbSidebar, SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { finalize, map, startWith } from 'rxjs/operators';

import selectorMap from '../../../assets/selector-map.json';
import type { ShowcaseMetaPackage } from '../meta';

import { SidebarToggle } from './sidebar-toggle';

@Component({
  selector: 'sbb-package-viewer',
  templateUrl: './package-viewer.component.html',
  styleUrl: './package-viewer.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SbbAccordionModule,
    SbbLinkModule,
    SbbFormFieldModule,
    SbbHeaderScrollOrigin,
    SbbIconModule,
    SbbSidebarModule,
    SbbTitleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageViewerComponent {
  #activatedRoute = inject(ActivatedRoute);
  protected sidebarToggle = inject(SidebarToggle);
  protected package: Signal<ShowcaseMetaPackage> = toSignal(
    this.#activatedRoute.data.pipe(map((data) => data['packageData'] as ShowcaseMetaPackage)),
    { initialValue: {} as ShowcaseMetaPackage },
  );
  private _sidebar = viewChild.required(SbbSidebar);

  protected searchControl = new FormControl('', { nonNullable: true });
  #searchQuery = toSignal(
    this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    { initialValue: '' },
  );

  protected filteredSections = computed(() => {
    const query = this.#searchQuery().trim().toLowerCase();
    const sections = this.package().sections ?? [];
    if (!query) {
      return sections;
    }

    // Derive package folder key from package name, e.g. "@sbb-esta/angular" -> "angular"
    const packageName = this.package().name ?? '';
    const packageKey = packageName.replace('@sbb-esta/', '');
    const packageSelectors =
      (selectorMap as Record<string, Record<string, string[]>>)[packageKey] ?? {};

    return sections
      .map((section) => ({
        ...section,
        entries: section.entries.filter((e) => {
          if (e.label.toLowerCase().trim().includes(query)) {
            return true;
          }

          // Look up real selectors for this entry from the generated map
          const module = e.link.split('/').at(-1) ?? '';
          const selectors = packageSelectors[module] ?? [];

          // Normalize camelCase selectors (e.g. "sbbAutocomplete") to kebab-case for comparison
          return selectors.some((sel) => {
            const normalized = sel.replaceAll('-', '').toLowerCase();
            const normalizedQuery = query.replaceAll('-', '').toLowerCase();
            return normalized.includes(normalizedQuery) || normalizedQuery.includes(normalized);
          });
        }),
      }))
      .filter((section) => section.entries.length > 0);
  });

  constructor() {
    toObservable(this._sidebar)
      .pipe(finalize(() => this.sidebarToggle.unregister()))
      .subscribe((sidebar) => this.sidebarToggle.register(sidebar));
  }
}
