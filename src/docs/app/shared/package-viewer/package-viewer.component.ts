import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbHeaderScrollOrigin } from '@sbb-esta/lyne-angular/header';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbSidebar, SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { finalize, map, startWith } from 'rxjs/operators';

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
    SbbBlockLink,
    SbbFormFieldModule,
    SbbHeaderScrollOrigin,
    SbbIcon,
    SbbSidebarModule,
    SbbTitle,
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
    const query = this.#searchQuery();
    const sections = this.package().sections ?? [];
    return query
      ? sections
          .map((section) => ({
            ...section,
            entries: section.entries.filter((e) =>
              e.label.toLowerCase().includes(query.toLowerCase()),
            ),
          }))
          .filter((section) => section.entries.length > 0)
      : sections;
  });

  constructor() {
    toObservable(this._sidebar)
      .pipe(finalize(() => this.sidebarToggle.unregister()))
      .subscribe((sidebar) => this.sidebarToggle.register(sidebar));
  }
}
