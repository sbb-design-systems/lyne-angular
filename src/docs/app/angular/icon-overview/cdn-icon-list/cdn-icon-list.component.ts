import { Component, computed, input, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbPaginator, SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import type { SbbPaginatorPageEvent } from '@sbb-esta/lyne-elements/paginator.pure.js';

import type { CdnIcon, CdnIcons } from '../cdn-icon.service';

import { CdnIconComponent } from './cdn-icon/cdn-icon.component';

@Component({
  selector: 'sbb-cdn-icon-list',
  imports: [
    SbbFormFieldModule,
    SbbSelectModule,
    SbbCheckboxModule,
    ReactiveFormsModule,
    FormField,
    SbbPaginatorModule,
    CdnIconComponent,
  ],
  templateUrl: './cdn-icon-list.component.html',
  styleUrl: './cdn-icon-list.component.scss',
})
export class CdnIconListComponent {
  cdnIcons = input.required<CdnIcons>();
  namespaces = ['icon', 'picto', 'kom', 'fpl'];
  deprecatedNamespaces = ['kom', 'fpl'];
  pageSize: number = 50;
  paginator = viewChild.required(SbbPaginator);
  protected readonly currentPage = signal<number>(0);

  protected readonly filterForm = form(
    signal({
      fulltext: '',
      namespaces: this.namespaces.filter((ns) => !this.deprecatedNamespaces.includes(ns)),
      fitIcons: false,
    }),
  );

  filteredIcons = computed<CdnIcon[]>(() => {
    const iconsData = this.cdnIcons();
    const paginator = this.paginator();

    const fulltext = (this.filterForm.fulltext().value() || '').toUpperCase();
    const activeNamespaces = this.filterForm.namespaces().value() || [];

    if (!iconsData?.icons) {
      return [];
    }

    const filtered = iconsData.icons.filter((i) => {
      const matchesNamespace = activeNamespaces.some(
        (ns) => i.namespace === ns || (!i.namespace && ns === 'icon'),
      );

      const matchesText =
        (i.namespace && i.namespace.toUpperCase().includes(fulltext)) ||
        i.name.toUpperCase().includes(fulltext) ||
        i.tags.some((tag) => !!tag && tag.toUpperCase().includes(fulltext));

      return matchesNamespace && matchesText;
    });

    if (paginator) {
      paginator.length = filtered.length;
      const start = this.currentPage() * this.pageSize;
      return filtered.slice(start, start + this.pageSize);
    }

    return filtered.slice(0, this.pageSize);
  });

  protected handlePageChange(event: SbbPaginatorPageEvent): void {
    this.currentPage.set(event.pageIndex);
  }
}
