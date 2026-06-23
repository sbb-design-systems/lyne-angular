import { Component, computed, effect, input, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbPaginatorPageEvent } from '@sbb-esta/lyne-elements/paginator.pure.js';

import type { CdnIcon, CdnIcons } from '../cdn-icon.service';

import { CdnIconComponent } from './cdn-icon/cdn-icon.component';

@Component({
  selector: 'sbb-cdn-icon-list',
  imports: [
    SbbFormFieldModule,
    SbbSelectModule,
    SbbCheckboxModule,
    SbbPaginatorModule,
    SbbNotificationModule,
    SbbTitleModule,
    CdnIconComponent,
    FormField,
  ],
  templateUrl: './cdn-icon-list.component.html',
  styleUrl: './cdn-icon-list.component.scss',
})
export class CdnIconListComponent {
  cdnIcons = input.required<CdnIcons>();
  protected readonly currentPage = signal<number>(0);
  protected readonly namespaces = ['icon', 'picto'];
  protected readonly pageSize: number = 50;

  protected readonly filterForm = form(
    signal({
      fulltext: '',
      namespaces: this.namespaces,
    }),
  );

  constructor() {
    //The effect will run whenever the fulltext or the namespaces change value, resetting the page to zero.
    effect(() => {
      this.filterForm.fulltext().value();
      this.filterForm.namespaces().value();
      this.currentPage.set(0);
    });
  }

  protected readonly allFilteredIcons = computed<CdnIcon[]>(() => {
    const iconsData = this.cdnIcons();
    if (!iconsData?.icons) {
      return [];
    }

    const fulltext = (this.filterForm.fulltext().value() || '').toUpperCase();
    const activeNamespaces = this.filterForm.namespaces().value() || [];
    return iconsData.icons.filter((i) => {
      const matchesNamespace = activeNamespaces.some(
        (ns) => i.namespace === ns || (!i.namespace && ns === 'icon'),
      );

      const matchesText =
        (i.namespace && i.namespace.toUpperCase().includes(fulltext)) ||
        i.name.toUpperCase().includes(fulltext) ||
        i.tags.some((tag) => !!tag && tag.toUpperCase().includes(fulltext));

      return matchesNamespace && matchesText;
    });
  });

  protected readonly filteredIconsCount = computed(() => this.allFilteredIcons().length);

  protected readonly filteredIcons = computed<CdnIcon[]>(() => {
    const start = this.currentPage() * this.pageSize;
    return this.allFilteredIcons().slice(start, start + this.pageSize);
  });

  protected handlePageChange(event: SbbPaginatorPageEvent): void {
    this.currentPage.set(event.pageIndex);
  }
}
