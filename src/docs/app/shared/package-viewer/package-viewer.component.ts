import type { Signal } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';
import { SbbHeaderScrollOrigin } from '@sbb-esta/lyne-angular/header';
import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { SbbSidebar, SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { finalize, map } from 'rxjs/operators';

import type { ShowcaseMetaPackage } from '../meta';

import { SidebarToggle } from './sidebar-toggle';

@Component({
  selector: 'sbb-package-viewer',
  templateUrl: './package-viewer.component.html',
  styleUrl: './package-viewer.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    SbbAccordionModule,
    SbbBlockLink,
    SbbHeaderScrollOrigin,
    SbbSidebarModule,
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

  constructor() {
    toObservable(this._sidebar)
      .pipe(finalize(() => this.sidebarToggle.unregister()))
      .subscribe((sidebar) => this.sidebarToggle.register(sidebar));
  }
}
