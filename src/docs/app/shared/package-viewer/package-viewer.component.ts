import { httpResource } from '@angular/common/http';
import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeaderScrollOrigin } from '@sbb-esta/lyne-angular/header';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbSidebar, SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { finalize, map } from 'rxjs/operators';

import type { ShowcaseMetaPackage } from '../meta';

import { SidebarToggle } from './sidebar-toggle';

@Component({
  selector: 'sbb-package-viewer',
  templateUrl: './package-viewer.component.html',
  styleUrl: './package-viewer.component.scss',
  imports: [
    FormField,
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
})
export class PackageViewerComponent {
  #activatedRoute = inject(ActivatedRoute);
  protected sidebarToggle = inject(SidebarToggle);
  protected package = toSignal(
    this.#activatedRoute.data.pipe(map((data) => data['packageData'] as ShowcaseMetaPackage)),
    { initialValue: {} as ShowcaseMetaPackage },
  );
  private _sidebar = viewChild.required(SbbSidebar);

  #selectorMapResource = httpResource<Record<string, Record<string, string[]>>>(
    () => 'assets/selector-map.json',
  );

  #guideKeywordsResource = httpResource<Record<string, Record<string, string[]>>>(
    () => 'assets/guide-keywords.json',
  );

  protected search = form(signal(''));

  protected filteredSections = computed(() => {
    const query = this.search().value().trim().toLowerCase();
    const sections = this.package().sections ?? [];
    if (!query) {
      return sections;
    }

    // Derive package folder key from package name, e.g. "@sbb-esta/lyne-angular" -> "angular"
    const packageName = this.package().name ?? '';
    const packageKey = packageName.replace('@sbb-esta/lyne-', '');
    const packageSelectors = (this.#selectorMapResource.value() ?? {})[packageKey] ?? {};
    const packageGuideKeywords = (this.#guideKeywordsResource.value() ?? {})[packageKey] ?? {};

    return sections
      .map((section) => ({
        ...section,
        entries: section.entries.filter((e) => {
          if (e.label.toLowerCase().trim().includes(query)) {
            return true;
          }

          const module = e.link.split('/').at(-1) ?? '';

          // For guide entries: check extracted guide keywords
          if (e.link.includes('/guides/')) {
            const guideKeywords = packageGuideKeywords[module] ?? [];
            return guideKeywords.some((kw) => {
              const normalized = this.#normalizeString(kw);
              const normalizedQuery = this.#normalizeString(query);
              return normalized.includes(normalizedQuery) || normalizedQuery.includes(normalized);
            });
          }

          // For component entries: look up real selectors from the generated map
          const selectors = packageSelectors[module] ?? [];

          // Normalize camelCase selectors (e.g. "sbbAutocomplete") to kebab-case for comparison
          return selectors.some((sel) => {
            const normalized = this.#normalizeString(sel);
            const normalizedQuery = this.#normalizeString(query);
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

  #normalizeString(string: string): string {
    return string.replaceAll('-', '').replaceAll(' ', '').toLowerCase();
  }
}
